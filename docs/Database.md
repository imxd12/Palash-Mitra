# PALASH MITRA: Database Schema & Entity Relationships
## SIH Problem Statement PS-26042

---

## 1. Schema Overview
PALASH MITRA uses a relational schema designed for ACID compliance, referential integrity, and offline replication. The system supports PostgreSQL 14+ in production and embedded SQLite / JSON document storage for zero-dependency local runs.

---

## 2. Core Tables and Relationships

### `schools`
- `id`: UUID (Primary Key)
- `code`: VARCHAR(50) (e.g. `JH-RNC-042`)
- `name`: VARCHAR(255)
- `district`: VARCHAR(100) (e.g. `Khunti`)
- `block`: VARCHAR(100)
- `is_active`: BOOLEAN

### `users`
- `id`: UUID (Primary Key)
- `school_id`: UUID (Foreign Key -> `schools.id`)
- `name`: VARCHAR(255)
- `email`: VARCHAR(255) (Unique)
- `role`: ENUM (`TEACHER`, `SCHOOL_ADMIN`, `DISTRICT_ADMIN`, `LANGUAGE_EXPERT`, `SYSTEM_ADMIN`)
- `password_hash`: VARCHAR(255)
- `primary_language`: VARCHAR(20)
- `target_languages`: TEXT[]

### `curriculum`
- `id`: UUID (Primary Key)
- `grade`: INT (1 to 10)
- `subject`: VARCHAR(100) (e.g. `Mathematics`, `Science`, `EVS`)
- `chapter_number`: INT
- `chapter_title`: VARCHAR(255)
- `topic`: VARCHAR(255)
- `competency`: TEXT
- `learning_outcome`: TEXT
- `difficulty`: ENUM (`EASY`, `MEDIUM`, `HARD`, `CHALLENGE`)

### `language_terms` (Knowledge Bank)
- `id`: UUID (Primary Key)
- `language_code`: VARCHAR(20) (`sat`, `hoc`, `unr`)
- `term_hi`: VARCHAR(255)
- `term_target_script`: VARCHAR(255) (Ol Chiki for Santhali)
- `term_target_latin`: VARCHAR(255)
- `phonetic_ipa`: VARCHAR(255)
- `meaning_hi`: TEXT
- `subject`: VARCHAR(100)
- `grade`: INT
- `verification_status`: ENUM (`AI_GENERATED`, `TEACHER_REVIEWED`, `LANGUAGE_EXPERT_VERIFIED`, `OFFICIALLY_APPROVED`)
- `contributor_id`: UUID (Foreign Key -> `users.id`)

### `student_progress`
- `id`: UUID (Primary Key)
- `student_id`: UUID (Foreign Key -> `students.id`)
- `topic`: VARCHAR(255)
- `mastery_score`: NUMERIC(4,3)
- `attempts_count`: INT
- `mistakes_summary`: JSONB
- `needs_remediation`: BOOLEAN

### `sync_queue`
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key -> `users.id`)
- `entity_type`: VARCHAR(50)
- `action`: VARCHAR(20)
- `payload_json`: JSONB
- `status`: ENUM (`PENDING`, `SYNCED`, `CONFLICT`)
