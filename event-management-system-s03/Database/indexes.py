"""
Event Management System - MongoDB Index Definitions & Optimization
Team No: S03
Run this once at application startup to ensure all indexes exist.
"""

from pymongo import MongoClient, ASCENDING, DESCENDING, TEXT, GEOSPHERE
from pymongo.errors import OperationFailure
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "event_management_system"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]


def create_indexes():
    print("⚡ Creating indexes for Event Management System...\n")

    # ── USERS ──────────────────────────────────────────────────
    db.users.create_index([("email", ASCENDING)], unique=True, name="idx_users_email_unique")
    db.users.create_index([("role", ASCENDING)], name="idx_users_role")
    db.users.create_index([("skills", ASCENDING)], name="idx_users_skills")          # HR talent search
    db.users.create_index([("is_active", ASCENDING)], name="idx_users_active")
    db.users.create_index([("location.city", ASCENDING)], name="idx_users_city")
    # Text index for HR talent discovery
    db.users.create_index(
        [("full_name", TEXT), ("bio", TEXT), ("skills", TEXT)],
        name="idx_users_fulltext"
    )
    print("✅ users — 5 indexes created")

    # ── EVENTS ────────────────────────────────────────────────
    db.events.create_index([("slug", ASCENDING)], unique=True, name="idx_events_slug_unique")
    db.events.create_index([("organizer_id", ASCENDING)], name="idx_events_organizer")
    db.events.create_index([("event_type", ASCENDING)], name="idx_events_type")
    db.events.create_index([("status", ASCENDING)], name="idx_events_status")
    db.events.create_index([("schedule.start_datetime", DESCENDING)], name="idx_events_start_date")
    db.events.create_index([("venue.city", ASCENDING)], name="idx_events_city")
    db.events.create_index([("tags", ASCENDING)], name="idx_events_tags")
    # Compound: browsing upcoming public events by type
    db.events.create_index(
        [("status", ASCENDING), ("event_type", ASCENDING), ("schedule.start_datetime", DESCENDING)],
        name="idx_events_browse"
    )
    # Full-text search for event discovery
    db.events.create_index(
        [("title", TEXT), ("description", TEXT), ("tags", TEXT)],
        name="idx_events_fulltext"
    )
    print("✅ events — 9 indexes created")

    # ── REGISTRATIONS ─────────────────────────────────────────
    db.registrations.create_index([("event_id", ASCENDING)], name="idx_reg_event")
    db.registrations.create_index([("user_id", ASCENDING)], name="idx_reg_user")
    # Compound: prevent duplicate registrations
    db.registrations.create_index(
        [("event_id", ASCENDING), ("user_id", ASCENDING)],
        unique=True,
        name="idx_reg_event_user_unique"
    )
    db.registrations.create_index([("status", ASCENDING)], name="idx_reg_status")
    db.registrations.create_index(
        [("digital_pass.pass_id", ASCENDING)],
        unique=True,
        sparse=True,
        name="idx_reg_pass_id_unique"
    )
    db.registrations.create_index([("team_id", ASCENDING)], sparse=True, name="idx_reg_team")
    print("✅ registrations — 6 indexes created")

    # ── TEAMS ─────────────────────────────────────────────────
    db.teams.create_index([("event_id", ASCENDING)], name="idx_teams_event")
    db.teams.create_index([("team_code", ASCENDING)], unique=True, name="idx_teams_code_unique")
    db.teams.create_index([("leader_id", ASCENDING)], name="idx_teams_leader")
    db.teams.create_index([("members.user_id", ASCENDING)], name="idx_teams_member")
    # Compound: leaderboard queries (event + score)
    db.teams.create_index(
        [("event_id", ASCENDING), ("final_rank", ASCENDING)],
        name="idx_teams_leaderboard"
    )
    print("✅ teams — 5 indexes created")

    # ── FEEDBACK ──────────────────────────────────────────────
    db.feedback.create_index([("event_id", ASCENDING)], name="idx_feedback_event")
    db.feedback.create_index([("user_id", ASCENDING)], name="idx_feedback_user")
    # Compound: one feedback per user per event
    db.feedback.create_index(
        [("event_id", ASCENDING), ("user_id", ASCENDING)],
        unique=True,
        name="idx_feedback_event_user_unique"
    )
    print("✅ feedback — 3 indexes created")

    # ── QUIZZES ───────────────────────────────────────────────
    db.quizzes.create_index([("event_id", ASCENDING)], name="idx_quizzes_event")
    print("✅ quizzes — 1 index created")

    # ── QUIZ ATTEMPTS ─────────────────────────────────────────
    db.quiz_attempts.create_index([("quiz_id", ASCENDING)], name="idx_attempts_quiz")
    db.quiz_attempts.create_index([("user_id", ASCENDING)], name="idx_attempts_user")
    db.quiz_attempts.create_index(
        [("quiz_id", ASCENDING), ("user_id", ASCENDING)],
        name="idx_attempts_quiz_user"
    )
    db.quiz_attempts.create_index([("event_id", ASCENDING)], name="idx_attempts_event")
    print("✅ quiz_attempts — 4 indexes created")

    # ── CERTIFICATES ──────────────────────────────────────────
    db.certificates.create_index([("user_id", ASCENDING)], name="idx_certs_user")
    db.certificates.create_index([("event_id", ASCENDING)], name="idx_certs_event")
    db.certificates.create_index(
        [("verification_code", ASCENDING)],
        unique=True,
        name="idx_certs_verification_unique"
    )
    print("✅ certificates — 3 indexes created")

    # ── NOTIFICATIONS ─────────────────────────────────────────
    db.notifications.create_index([("user_id", ASCENDING)], name="idx_notif_user")
    db.notifications.create_index(
        [("user_id", ASCENDING), ("is_read", ASCENDING)],
        name="idx_notif_user_unread"
    )
    # TTL index: auto-delete notifications older than 90 days
    db.notifications.create_index(
        [("created_at", ASCENDING)],
        expireAfterSeconds=7776000,        # 90 days
        name="idx_notif_ttl_90days"
    )
    print("✅ notifications — 3 indexes (including TTL) created")

    # ── VOLUNTEER TASKS ───────────────────────────────────────
    db.volunteer_tasks.create_index([("event_id", ASCENDING)], name="idx_tasks_event")
    db.volunteer_tasks.create_index([("volunteer_id", ASCENDING)], name="idx_tasks_volunteer")
    db.volunteer_tasks.create_index([("status", ASCENDING)], name="idx_tasks_status")
    print("✅ volunteer_tasks — 3 indexes created")

    print("\n🎉 All indexes created successfully!")


if __name__ == "__main__":
    create_indexes()
