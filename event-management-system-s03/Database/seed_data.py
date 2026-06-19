"""
Event Management System - Sample Seed Data
Team No: S03
Run this to populate the DB with realistic test data.
"""

from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["event_management_system"]


def seed():
    print("🌱 Seeding EMS database...\n")

    # ── Clean existing data ──
    for col in ["users", "events", "registrations", "teams", "feedback",
                "quizzes", "quiz_attempts", "certificates", "notifications", "volunteer_tasks"]:
        db[col].drop()
    print("🧹 Cleared old data")

    # ── Users ──────────────────────────────────────────────────
    users_data = [
        {
            "_id": ObjectId("6660000000000000000000a1"),
            "full_name": "Priya Organizer",
            "email": "priya@ems.com",
            "password_hash": "$2b$12$hashedpassword",
            "phone": "9876543210",
            "role": "organizer",
            "secondary_roles": [],
            "bio": "Tech event organizer at KL University",
            "organization": "KL University",
            "skills": ["event management", "coordination"],
            "location": {"city": "Vijayawada", "state": "Andhra Pradesh", "country": "India"},
            "is_verified": True, "is_active": True,
            "created_at": datetime.utcnow(), "updated_at": datetime.utcnow()
        },
        {
            "_id": ObjectId("6660000000000000000000a2"),
            "full_name": "Ravi Participant",
            "email": "ravi@student.com",
            "password_hash": "$2b$12$hashedpassword",
            "phone": "9123456780",
            "role": "participant",
            "secondary_roles": [],
            "bio": "CSE final year student, ML enthusiast",
            "organization": "KL University",
            "skills": ["Python", "Machine Learning", "NLP", "React"],
            "linkedin_url": "https://linkedin.com/in/ravik",
            "location": {"city": "Vijayawada", "state": "Andhra Pradesh", "country": "India"},
            "is_verified": True, "is_active": True,
            "created_at": datetime.utcnow(), "updated_at": datetime.utcnow()
        },
        {
            "_id": ObjectId("6660000000000000000000a3"),
            "full_name": "Ananya Judge",
            "email": "ananya@techcorp.com",
            "password_hash": "$2b$12$hashedpassword",
            "phone": "9988776655",
            "role": "judge",
            "secondary_roles": ["speaker"],
            "bio": "Senior Engineer at TechCorp, 10 years in AI",
            "organization": "TechCorp",
            "skills": ["AI", "System Design", "Cloud"],
            "location": {"city": "Hyderabad", "state": "Telangana", "country": "India"},
            "is_verified": True, "is_active": True,
            "created_at": datetime.utcnow(), "updated_at": datetime.utcnow()
        },
        {
            "_id": ObjectId("6660000000000000000000a4"),
            "full_name": "Deepak HR",
            "email": "deepak@startup.io",
            "password_hash": "$2b$12$hashedpassword",
            "phone": "9011223344",
            "role": "hr",
            "secondary_roles": [],
            "bio": "Talent acquisition at Startup.io",
            "organization": "Startup.io",
            "skills": ["Recruitment", "HR", "Talent Discovery"],
            "location": {"city": "Bangalore", "state": "Karnataka", "country": "India"},
            "is_verified": True, "is_active": True,
            "created_at": datetime.utcnow(), "updated_at": datetime.utcnow()
        },
        {
            "_id": ObjectId("6660000000000000000000a5"),
            "full_name": "Sita Volunteer",
            "email": "sita@volunteer.com",
            "password_hash": "$2b$12$hashedpassword",
            "role": "volunteer",
            "secondary_roles": [],
            "organization": "KL University",
            "skills": ["Coordination", "Communication"],
            "location": {"city": "Vijayawada", "state": "Andhra Pradesh", "country": "India"},
            "is_verified": True, "is_active": True,
            "created_at": datetime.utcnow(), "updated_at": datetime.utcnow()
        }
    ]
    db.users.insert_many(users_data)
    print(f"✅ Inserted {len(users_data)} users")

    # ── Events ─────────────────────────────────────────────────
    event_id_1 = ObjectId("6660000000000000000000b1")
    event_id_2 = ObjectId("6660000000000000000000b2")

    events_data = [
        {
            "_id": event_id_1,
            "title": "AI Hackathon 2025",
            "slug": "ai-hackathon-2025",
            "description": "Build AI solutions for real-world problems in 24 hours.",
            "event_type": "Hackathon",
            "organizer_id": ObjectId("6660000000000000000000a1"),
            "co_organizers": [],
            "status": "published",
            "visibility": "public",
            "schedule": {
                "start_datetime": datetime.utcnow() + timedelta(days=10),
                "end_datetime": datetime.utcnow() + timedelta(days=11),
                "timezone": "Asia/Kolkata",
                "sessions": [
                    {
                        "session_id": "s1",
                        "title": "Opening Keynote",
                        "speaker_id": ObjectId("6660000000000000000000a3"),
                        "start_time": datetime.utcnow() + timedelta(days=10, hours=9),
                        "end_time": datetime.utcnow() + timedelta(days=10, hours=10),
                        "room_or_link": "Main Hall"
                    }
                ]
            },
            "venue": {
                "mode": "offline",
                "address": "KL University, Vaddeswaram",
                "city": "Vijayawada",
                "state": "Andhra Pradesh",
                "map_link": "https://maps.google.com/?q=KL+University",
                "online_link": ""
            },
            "registration": {
                "max_participants": 200,
                "registered_count": 1,
                "deadline": datetime.utcnow() + timedelta(days=7),
                "fee": 0.0,
                "team_allowed": True,
                "min_team_size": 2,
                "max_team_size": 4
            },
            "tags": ["AI", "ML", "hackathon", "students", "python"],
            "banner_url": "https://cdn.ems.com/banners/ai-hackathon.jpg",
            "resources": [],
            "sponsors": [
                {
                    "sponsor_id": ObjectId("6660000000000000000000a4"),
                    "tier": "gold",
                    "amount": 50000.0
                }
            ],
            "judges": [ObjectId("6660000000000000000000a3")],
            "volunteers": [ObjectId("6660000000000000000000a5")],
            "analytics": {"views": 245, "registrations": 1, "attendance": 0, "avg_feedback_score": 0.0},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "_id": event_id_2,
            "title": "Web Dev Workshop: React Fundamentals",
            "slug": "react-fundamentals-workshop",
            "description": "Hands-on workshop on React basics, hooks, and state management.",
            "event_type": "Workshop",
            "organizer_id": ObjectId("6660000000000000000000a1"),
            "status": "published",
            "visibility": "public",
            "schedule": {
                "start_datetime": datetime.utcnow() + timedelta(days=5),
                "end_datetime": datetime.utcnow() + timedelta(days=5, hours=4),
                "timezone": "Asia/Kolkata",
                "sessions": []
            },
            "venue": {
                "mode": "online",
                "address": "",
                "city": "Vijayawada",
                "state": "Andhra Pradesh",
                "online_link": "https://meet.google.com/abc-xyz"
            },
            "registration": {
                "max_participants": 100,
                "registered_count": 0,
                "deadline": datetime.utcnow() + timedelta(days=4),
                "fee": 0.0,
                "team_allowed": False,
                "min_team_size": 1,
                "max_team_size": 1
            },
            "tags": ["React", "JavaScript", "frontend", "workshop"],
            "analytics": {"views": 89, "registrations": 0, "attendance": 0, "avg_feedback_score": 0.0},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    db.events.insert_many(events_data)
    print(f"✅ Inserted {len(events_data)} events")

    # ── Registration ───────────────────────────────────────────
    registration_data = {
        "_id": ObjectId("6660000000000000000000c1"),
        "event_id": event_id_1,
        "user_id": ObjectId("6660000000000000000000a2"),
        "team_id": None,
        "status": "confirmed",
        "payment_status": "free",
        "registered_at": datetime.utcnow(),
        "checked_in": False,
        "digital_pass": {
            "qr_code_url": "https://cdn.ems.com/qr/PASS-001.png",
            "pass_id": "PASS-AI-HACK-001",
            "issued_at": datetime.utcnow()
        },
        "certificate_issued": False
    }
    db.registrations.insert_one(registration_data)
    print("✅ Inserted 1 registration")

    # ── Team ───────────────────────────────────────────────────
    team_data = {
        "_id": ObjectId("6660000000000000000000d1"),
        "event_id": event_id_1,
        "team_name": "Neural Ninjas",
        "team_code": "NN-HACK-2025",
        "leader_id": ObjectId("6660000000000000000000a2"),
        "members": [
            {
                "user_id": ObjectId("6660000000000000000000a2"),
                "joined_at": datetime.utcnow(),
                "status": "active"
            }
        ],
        "project_submission": None,
        "scores": [],
        "final_rank": None,
        "created_at": datetime.utcnow()
    }
    db.teams.insert_one(team_data)
    print("✅ Inserted 1 team")

    # ── Quiz ───────────────────────────────────────────────────
    quiz_data = {
        "_id": ObjectId("6660000000000000000000e1"),
        "event_id": event_id_2,
        "title": "React Pre-workshop Knowledge Check",
        "duration_minutes": 10,
        "questions": [
            {
                "q_id": "q1",
                "question_text": "What hook is used for state in React?",
                "options": ["useEffect", "useState", "useRef", "useMemo"],
                "correct_option_index": 1,
                "marks": 2
            },
            {
                "q_id": "q2",
                "question_text": "What does JSX stand for?",
                "options": ["JavaScript XML", "Java Syntax Extension", "JSON XML", "None"],
                "correct_option_index": 0,
                "marks": 2
            }
        ],
        "pass_percentage": 50.0,
        "created_by": ObjectId("6660000000000000000000a1"),
        "created_at": datetime.utcnow()
    }
    db.quizzes.insert_one(quiz_data)
    print("✅ Inserted 1 quiz")

    # ── Volunteer Task ──────────────────────────────────────────
    task_data = {
        "_id": ObjectId("6660000000000000000000f1"),
        "event_id": event_id_1,
        "volunteer_id": ObjectId("6660000000000000000000a5"),
        "assigned_by": ObjectId("6660000000000000000000a1"),
        "task_title": "Manage Registration Desk",
        "description": "Check QR passes and guide participants to their teams.",
        "status": "assigned",
        "due_datetime": datetime.utcnow() + timedelta(days=10, hours=8),
        "completed_at": None,
        "notes": "Bring your laptop for the QR scanner app."
    }
    db.volunteer_tasks.insert_one(task_data)
    print("✅ Inserted 1 volunteer task")

    print("\n🎉 Database seeded successfully!")
    print(f"   DB: event_management_system")
    print(f"   Collections: {db.list_collection_names()}")


if __name__ == "__main__":
    seed()
