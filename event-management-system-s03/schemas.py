"""
Event Management System - MongoDB Schema Definitions
Team No: S03 | Database Design & Optimization
Uses: PyMongo + Python
"""

from datetime import datetime
from bson import ObjectId

# ─────────────────────────────────────────────────────────────
# COLLECTION 1: users
# Covers: Participants, Organizers, Speakers, Judges, HR,
#         Sponsors, Volunteers, Admins, NGO Workers, etc.
# ─────────────────────────────────────────────────────────────
USER_SCHEMA = {
    "_id": ObjectId(),                    # Auto-generated
    "full_name": "string",
    "email": "string (unique)",
    "password_hash": "string",
    "phone": "string",
    "profile_pic_url": "string",
    "role": "string",                     # participant | organizer | speaker | judge |
                                          # sponsor | hr | volunteer | admin | ngo_worker
    "secondary_roles": ["string"],        # A user can have multiple roles
    "bio": "string",
    "organization": "string",
    "skills": ["string"],                 # For participants/job seekers
    "linkedin_url": "string",
    "github_url": "string",
    "location": {
        "city": "string",
        "state": "string",
        "country": "string"
    },
    "is_verified": "bool",
    "is_active": "bool",
    "created_at": "datetime",
    "updated_at": "datetime",
    "last_login": "datetime",
    "preferences": {
        "event_types": ["string"],        # Workshop, Hackathon, etc.
        "notifications_enabled": "bool",
        "language": "string"
    }
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 2: events
# Covers all event types from the PDF
# ─────────────────────────────────────────────────────────────
EVENT_SCHEMA = {
    "_id": ObjectId(),
    "title": "string",
    "slug": "string (unique)",            # URL-friendly identifier
    "description": "string",
    "event_type": "string",               # Workshop | Hackathon | Job Fair | NGO Program |
                                          # Fundraising | Healthcare Camp | Awareness Campaign |
                                          # Mentorship | Volunteer Drive | Startup Pitch |
                                          # Scholarship | Cultural | Community Meeting | Gov Welfare
    "organizer_id": "ObjectId → users",
    "co_organizers": ["ObjectId → users"],
    "status": "string",                   # draft | published | ongoing | completed | cancelled
    "visibility": "string",               # public | private | invite_only

    "schedule": {
        "start_datetime": "datetime",
        "end_datetime": "datetime",
        "timezone": "string",
        "sessions": [
            {
                "session_id": "string",
                "title": "string",
                "speaker_id": "ObjectId → users",
                "start_time": "datetime",
                "end_time": "datetime",
                "room_or_link": "string"
            }
        ]
    },

    "venue": {
        "mode": "string",                 # online | offline | hybrid
        "address": "string",
        "city": "string",
        "state": "string",
        "map_link": "string",
        "online_link": "string"
    },

    "registration": {
        "max_participants": "int",
        "registered_count": "int",        # Cached count for fast reads
        "deadline": "datetime",
        "fee": "float",                   # 0 for free events
        "team_allowed": "bool",
        "min_team_size": "int",
        "max_team_size": "int"
    },

    "tags": ["string"],                   # For search/filter
    "banner_url": "string",
    "resources": [
        {
            "title": "string",
            "url": "string",
            "uploaded_by": "ObjectId → users",
            "uploaded_at": "datetime"
        }
    ],

    "sponsors": [
        {
            "sponsor_id": "ObjectId → users",
            "tier": "string",             # gold | silver | bronze
            "amount": "float"
        }
    ],

    "judges": ["ObjectId → users"],
    "volunteers": ["ObjectId → users"],

    "certificate_template_id": "ObjectId → certificates",
    "feedback_form_id": "ObjectId → feedback_forms",
    "quiz_ids": ["ObjectId → quizzes"],

    "analytics": {
        "views": "int",
        "registrations": "int",
        "attendance": "int",
        "avg_feedback_score": "float"
    },

    "created_at": "datetime",
    "updated_at": "datetime"
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 3: registrations
# Every participant registration for an event
# ─────────────────────────────────────────────────────────────
REGISTRATION_SCHEMA = {
    "_id": ObjectId(),
    "event_id": "ObjectId → events",
    "user_id": "ObjectId → users",
    "team_id": "ObjectId → teams",        # null if individual
    "status": "string",                   # pending | confirmed | waitlisted | cancelled
    "payment_status": "string",           # free | paid | pending | refunded
    "payment_ref": "string",
    "registered_at": "datetime",
    "checked_in": "bool",
    "check_in_time": "datetime",
    "digital_pass": {
        "qr_code_url": "string",
        "pass_id": "string (unique)",
        "issued_at": "datetime"
    },
    "certificate_issued": "bool",
    "certificate_url": "string"
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 4: teams
# For Hackathons, Startup Pitches, etc.
# ─────────────────────────────────────────────────────────────
TEAM_SCHEMA = {
    "_id": ObjectId(),
    "event_id": "ObjectId → events",
    "team_name": "string",
    "team_code": "string (unique)",       # For others to join
    "leader_id": "ObjectId → users",
    "members": [
        {
            "user_id": "ObjectId → users",
            "joined_at": "datetime",
            "status": "string"            # active | left
        }
    ],
    "project_submission": {
        "title": "string",
        "description": "string",
        "repo_link": "string",
        "demo_link": "string",
        "submitted_at": "datetime"
    },
    "scores": [
        {
            "judge_id": "ObjectId → users",
            "criteria": [
                {"name": "string", "score": "float", "max_score": "float"}
            ],
            "total_score": "float",
            "remarks": "string",
            "scored_at": "datetime"
        }
    ],
    "final_rank": "int",
    "created_at": "datetime"
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 5: feedback
# Post-event feedback from participants
# ─────────────────────────────────────────────────────────────
FEEDBACK_SCHEMA = {
    "_id": ObjectId(),
    "event_id": "ObjectId → events",
    "user_id": "ObjectId → users",
    "overall_rating": "int",              # 1–5
    "responses": [
        {
            "question": "string",
            "answer": "string or int"
        }
    ],
    "suggestions": "string",
    "submitted_at": "datetime",
    "is_anonymous": "bool"
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 6: quizzes
# For workshops, awareness campaigns, scholarship tests
# ─────────────────────────────────────────────────────────────
QUIZ_SCHEMA = {
    "_id": ObjectId(),
    "event_id": "ObjectId → events",
    "title": "string",
    "duration_minutes": "int",
    "questions": [
        {
            "q_id": "string",
            "question_text": "string",
            "options": ["string"],
            "correct_option_index": "int",
            "marks": "int"
        }
    ],
    "pass_percentage": "float",
    "created_by": "ObjectId → users",
    "created_at": "datetime"
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 7: quiz_attempts
# Participant quiz submissions
# ─────────────────────────────────────────────────────────────
QUIZ_ATTEMPT_SCHEMA = {
    "_id": ObjectId(),
    "quiz_id": "ObjectId → quizzes",
    "user_id": "ObjectId → users",
    "event_id": "ObjectId → events",
    "answers": [
        {"q_id": "string", "selected_option": "int"}
    ],
    "score": "float",
    "passed": "bool",
    "attempted_at": "datetime",
    "time_taken_seconds": "int"
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 8: certificates
# Digital certificates issued to participants
# ─────────────────────────────────────────────────────────────
CERTIFICATE_SCHEMA = {
    "_id": ObjectId(),
    "user_id": "ObjectId → users",
    "event_id": "ObjectId → events",
    "registration_id": "ObjectId → registrations",
    "certificate_type": "string",         # participation | winner | speaker | volunteer
    "issued_at": "datetime",
    "certificate_url": "string",
    "verification_code": "string (unique)",
    "is_valid": "bool"
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 9: notifications
# In-app and push notifications
# ─────────────────────────────────────────────────────────────
NOTIFICATION_SCHEMA = {
    "_id": ObjectId(),
    "user_id": "ObjectId → users",
    "title": "string",
    "message": "string",
    "type": "string",                     # event_reminder | registration | certificate |
                                          # task_assigned | announcement | feedback_request
    "related_event_id": "ObjectId → events",
    "is_read": "bool",
    "created_at": "datetime"
}

# ─────────────────────────────────────────────────────────────
# COLLECTION 10: volunteer_tasks
# Tasks assigned to volunteers for an event
# ─────────────────────────────────────────────────────────────
VOLUNTEER_TASK_SCHEMA = {
    "_id": ObjectId(),
    "event_id": "ObjectId → events",
    "volunteer_id": "ObjectId → users",
    "assigned_by": "ObjectId → users",   # Organizer
    "task_title": "string",
    "description": "string",
    "status": "string",                   # assigned | in_progress | completed
    "due_datetime": "datetime",
    "completed_at": "datetime",
    "notes": "string"
}