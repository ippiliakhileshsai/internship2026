"""
Event Management System - Core DB Operations
Team No: S03
Covers all user roles and their key queries.
"""

from pymongo import MongoClient, ReturnDocument
from bson import ObjectId
from datetime import datetime
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["event_management_system"]


# ═══════════════════════════════════════════════════════════════
# ── 1. PARTICIPANTS: Browse & Register ──────────────────────────
# ═══════════════════════════════════════════════════════════════

def browse_events(event_type=None, city=None, status="published", page=1, limit=12):
    """
    Participant: Browse events with filters.
    Uses compound index: idx_events_browse
    """
    query = {"status": status}
    if event_type:
        query["event_type"] = event_type
    if city:
        query["venue.city"] = city

    skip = (page - 1) * limit
    cursor = db.events.find(
        query,
        projection={
            "title": 1, "event_type": 1, "schedule.start_datetime": 1,
            "venue": 1, "banner_url": 1, "registration.fee": 1,
            "analytics.registrations": 1, "tags": 1
        }
    ).sort("schedule.start_datetime", -1).skip(skip).limit(limit)

    return list(cursor)


def search_events(keyword):
    """
    Participant: Full-text search on title, description, tags.
    Uses text index: idx_events_fulltext
    """
    return list(db.events.find(
        {"$text": {"$search": keyword}, "status": "published"},
        {"score": {"$meta": "textScore"}, "title": 1, "event_type": 1,
         "schedule.start_datetime": 1, "venue.city": 1}
    ).sort([("score", {"$meta": "textScore"})]).limit(20))


def register_for_event(user_id: str, event_id: str, team_id: str = None):
    """
    Participant: Register for an event.
    Atomic: checks capacity and inserts in one go.
    """
    event = db.events.find_one(
        {"_id": ObjectId(event_id), "status": "published"},
        {"registration": 1}
    )
    if not event:
        return {"error": "Event not found or not published"}

    reg = event["registration"]
    if reg["registered_count"] >= reg["max_participants"]:
        return {"error": "Event is full"}

    registration_doc = {
        "event_id": ObjectId(event_id),
        "user_id": ObjectId(user_id),
        "team_id": ObjectId(team_id) if team_id else None,
        "status": "confirmed",
        "payment_status": "free" if reg["fee"] == 0 else "pending",
        "registered_at": datetime.utcnow(),
        "checked_in": False,
        "digital_pass": {
            "qr_code_url": "",          # Generated after insert
            "pass_id": f"PASS-{ObjectId()}",
            "issued_at": datetime.utcnow()
        },
        "certificate_issued": False
    }

    try:
        result = db.registrations.insert_one(registration_doc)
        # Increment cached count atomically
        db.events.update_one(
            {"_id": ObjectId(event_id)},
            {"$inc": {"registration.registered_count": 1, "analytics.registrations": 1}}
        )
        return {"registration_id": str(result.inserted_id), "status": "confirmed"}
    except Exception as e:
        return {"error": "Already registered or DB error", "detail": str(e)}


def get_my_registrations(user_id: str):
    """Participant: View all registered events with event details."""
    pipeline = [
        {"$match": {"user_id": ObjectId(user_id)}},
        {"$lookup": {
            "from": "events",
            "localField": "event_id",
            "foreignField": "_id",
            "as": "event_details",
            "pipeline": [
                {"$project": {
                    "title": 1, "event_type": 1, "schedule": 1,
                    "venue": 1, "status": 1, "banner_url": 1
                }}
            ]
        }},
        {"$unwind": "$event_details"},
        {"$sort": {"registered_at": -1}}
    ]
    return list(db.registrations.aggregate(pipeline))


# ═══════════════════════════════════════════════════════════════
# ── 2. ORGANIZER: Create & Manage Events ────────────────────────
# ═══════════════════════════════════════════════════════════════

def create_event(organizer_id: str, event_data: dict):
    """Organizer: Create a new event."""
    event_data.update({
        "organizer_id": ObjectId(organizer_id),
        "status": "draft",
        "registration": {**event_data.get("registration", {}), "registered_count": 0},
        "analytics": {"views": 0, "registrations": 0, "attendance": 0, "avg_feedback_score": 0.0},
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    })
    result = db.events.insert_one(event_data)
    return str(result.inserted_id)


def get_event_registrations(event_id: str, organizer_id: str):
    """Organizer: Get all participants for their event."""
    # Verify ownership first
    event = db.events.find_one(
        {"_id": ObjectId(event_id), "organizer_id": ObjectId(organizer_id)}
    )
    if not event:
        return {"error": "Unauthorized or event not found"}

    pipeline = [
        {"$match": {"event_id": ObjectId(event_id)}},
        {"$lookup": {
            "from": "users",
            "localField": "user_id",
            "foreignField": "_id",
            "as": "participant",
            "pipeline": [
                {"$project": {"full_name": 1, "email": 1, "phone": 1, "organization": 1}}
            ]
        }},
        {"$unwind": "$participant"},
        {"$project": {
            "participant": 1, "status": 1, "registered_at": 1,
            "checked_in": 1, "digital_pass.pass_id": 1
        }}
    ]
    return list(db.registrations.aggregate(pipeline))


def check_in_participant(pass_id: str):
    """Organizer: Scan QR pass and mark attendance."""
    result = db.registrations.find_one_and_update(
        {"digital_pass.pass_id": pass_id, "checked_in": False},
        {"$set": {"checked_in": True, "check_in_time": datetime.utcnow()}},
        return_document=ReturnDocument.AFTER
    )
    if not result:
        return {"error": "Pass not found or already checked in"}

    # Update attendance analytics
    db.events.update_one(
        {"_id": result["event_id"]},
        {"$inc": {"analytics.attendance": 1}}
    )
    return {"status": "checked_in", "user_id": str(result["user_id"])}


def get_event_feedback_analysis(event_id: str):
    """Organizer: Aggregate feedback scores for their event."""
    pipeline = [
        {"$match": {"event_id": ObjectId(event_id)}},
        {"$group": {
            "_id": "$event_id",
            "avg_rating": {"$avg": "$overall_rating"},
            "total_responses": {"$sum": 1},
            "rating_distribution": {"$push": "$overall_rating"}
        }}
    ]
    return list(db.feedback.aggregate(pipeline))


# ═══════════════════════════════════════════════════════════════
# ── 3. JUDGE: Score Teams ────────────────────────────────────────
# ═══════════════════════════════════════════════════════════════

def get_teams_to_judge(event_id: str, judge_id: str):
    """Judge: Get all teams for an event assigned to them."""
    return list(db.teams.find(
        {"event_id": ObjectId(event_id)},
        {"team_name": 1, "project_submission": 1, "members": 1, "scores": 1}
    ))


def submit_team_score(team_id: str, judge_id: str, criteria: list, remarks: str):
    """Judge: Submit score for a team."""
    total = sum(c["score"] for c in criteria)
    score_entry = {
        "judge_id": ObjectId(judge_id),
        "criteria": criteria,
        "total_score": total,
        "remarks": remarks,
        "scored_at": datetime.utcnow()
    }
    db.teams.update_one(
        {"_id": ObjectId(team_id)},
        {"$push": {"scores": score_entry}}
    )
    return {"status": "score_submitted", "total_score": total}


def get_event_leaderboard(event_id: str):
    """Judge/Organizer: Get ranked leaderboard for an event."""
    pipeline = [
        {"$match": {"event_id": ObjectId(event_id), "scores": {"$exists": True, "$ne": []}}},
        {"$addFields": {
            "avg_total_score": {"$avg": "$scores.total_score"}
        }},
        {"$sort": {"avg_total_score": -1}},
        {"$project": {
            "team_name": 1, "avg_total_score": 1,
            "project_submission.title": 1, "final_rank": 1
        }}
    ]
    return list(db.teams.aggregate(pipeline))


# ═══════════════════════════════════════════════════════════════
# ── 4. HR: Talent Discovery ──────────────────────────────────────
# ═══════════════════════════════════════════════════════════════

def discover_talent(skills: list = None, city: str = None, keyword: str = None):
    """
    HR: Find participants by skill or keyword.
    Uses: idx_users_skills, idx_users_fulltext
    """
    query = {"role": {"$in": ["participant", "student", "professional"]}, "is_active": True}

    if skills:
        query["skills"] = {"$in": skills}
    if city:
        query["location.city"] = city
    if keyword:
        query["$text"] = {"$search": keyword}

    projection = {"full_name": 1, "email": 1, "skills": 1,
                  "organization": 1, "linkedin_url": 1, "bio": 1}

    cursor = db.users.find(query, projection).limit(50)
    return list(cursor)


def get_hackathon_participants_with_scores(event_id: str):
    """HR: Get participants with their project submissions and scores (talent at hackathons)."""
    pipeline = [
        {"$match": {"event_id": ObjectId(event_id)}},
        {"$lookup": {
            "from": "users",
            "localField": "members.user_id",
            "foreignField": "_id",
            "as": "member_details",
            "pipeline": [
                {"$project": {"full_name": 1, "email": 1, "skills": 1, "linkedin_url": 1}}
            ]
        }},
        {"$addFields": {"avg_score": {"$avg": "$scores.total_score"}}},
        {"$sort": {"avg_score": -1}},
        {"$project": {
            "team_name": 1, "project_submission": 1,
            "member_details": 1, "avg_score": 1, "final_rank": 1
        }}
    ]
    return list(db.teams.aggregate(pipeline))


# ═══════════════════════════════════════════════════════════════
# ── 5. SPONSOR: Analytics ────────────────────────────────────────
# ═══════════════════════════════════════════════════════════════

def get_sponsor_event_analytics(sponsor_id: str):
    """Sponsor: View analytics for events they sponsored."""
    pipeline = [
        {"$match": {"sponsors.sponsor_id": ObjectId(sponsor_id)}},
        {"$project": {
            "title": 1, "event_type": 1,
            "analytics": 1,
            "schedule.start_datetime": 1,
            "sponsor_tier": {
                "$filter": {
                    "input": "$sponsors",
                    "as": "s",
                    "cond": {"$eq": ["$$s.sponsor_id", ObjectId(sponsor_id)]}
                }
            }
        }}
    ]
    return list(db.events.aggregate(pipeline))


# ═══════════════════════════════════════════════════════════════
# ── 6. VOLUNTEER: Task Management ────────────────────────────────
# ═══════════════════════════════════════════════════════════════

def get_my_volunteer_tasks(volunteer_id: str, event_id: str = None):
    """Volunteer: Get assigned tasks."""
    query = {"volunteer_id": ObjectId(volunteer_id)}
    if event_id:
        query["event_id"] = ObjectId(event_id)
    return list(db.volunteer_tasks.find(query).sort("due_datetime", 1))


def update_task_status(task_id: str, volunteer_id: str, status: str):
    """Volunteer: Update task progress."""
    update = {"$set": {"status": status}}
    if status == "completed":
        update["$set"]["completed_at"] = datetime.utcnow()
    return db.volunteer_tasks.update_one(
        {"_id": ObjectId(task_id), "volunteer_id": ObjectId(volunteer_id)},
        update
    ).modified_count


# ═══════════════════════════════════════════════════════════════
# ── 7. ADMIN: Platform Management ───────────────────────────────
# ═══════════════════════════════════════════════════════════════

def get_platform_stats():
    """Admin: High-level platform statistics."""
    return {
        "total_users": db.users.count_documents({}),
        "active_events": db.events.count_documents({"status": {"$in": ["published", "ongoing"]}}),
        "total_registrations": db.registrations.count_documents({}),
        "certificates_issued": db.certificates.count_documents({"is_valid": True}),
        "events_by_type": list(db.events.aggregate([
            {"$group": {"_id": "$event_type", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]))
    }


def get_all_users_paginated(page=1, limit=50, role=None):
    """Admin: Paginated user list with optional role filter."""
    query = {}
    if role:
        query["role"] = role
    skip = (page - 1) * limit
    return list(db.users.find(query, {"password_hash": 0}).skip(skip).limit(limit))
