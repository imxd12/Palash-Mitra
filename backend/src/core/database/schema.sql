-- ==============================================================================
-- PALASH MITRA Database Schema (PostgreSQL 14+)
-- SIH PS-26042: AI-Powered Vernacular Pedagogy Platform
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Schools Table
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    block VARCHAR(100) NOT NULL,
    cluster VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Users Table (Teachers, Admins, Experts)
CREATE TYPE user_role AS ENUM ('TEACHER', 'SCHOOL_ADMIN', 'DISTRICT_ADMIN', 'LANGUAGE_EXPERT', 'SYSTEM_ADMIN');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL DEFAULT 'TEACHER',
    password_hash VARCHAR(255) NOT NULL,
    primary_language VARCHAR(20) DEFAULT 'hi',
    target_languages TEXT[] DEFAULT ARRAY['sat'],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Classes Table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    grade INT NOT NULL CHECK (grade BETWEEN 1 AND 10),
    section VARCHAR(10) NOT NULL DEFAULT 'A',
    academic_year VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(school_id, grade, section, academic_year)
);

-- 4. Students Table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    roll_number VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    mother_tongue VARCHAR(20) NOT NULL DEFAULT 'sat',
    literacy_level VARCHAR(20) DEFAULT 'BEGINNER',
    numeracy_level VARCHAR(20) DEFAULT 'BEGINNER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Curriculum Table
CREATE TABLE curriculum (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grade INT NOT NULL CHECK (grade BETWEEN 1 AND 10),
    subject VARCHAR(100) NOT NULL,
    chapter_number INT NOT NULL,
    chapter_title VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    competency TEXT NOT NULL,
    learning_outcome TEXT NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'MEDIUM',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Language Terms (Knowledge Bank) Table
CREATE TYPE term_status AS ENUM ('AI_GENERATED', 'TEACHER_REVIEWED', 'LANGUAGE_EXPERT_VERIFIED', 'OFFICIALLY_APPROVED');

CREATE TABLE language_terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language_code VARCHAR(20) NOT NULL,
    term_hi VARCHAR(255) NOT NULL,
    term_target_script VARCHAR(255) NOT NULL, -- Ol Chiki for Santhali
    term_target_latin VARCHAR(255) NOT NULL,
    phonetic_ipa VARCHAR(255),
    meaning_hi TEXT,
    example_sentence_hi TEXT,
    example_sentence_target TEXT,
    subject VARCHAR(100),
    grade INT,
    audio_asset_url TEXT,
    verification_status term_status DEFAULT 'AI_GENERATED',
    contributor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Lessons Table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    curriculum_id UUID REFERENCES curriculum(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title_hi VARCHAR(255) NOT NULL,
    title_sat VARCHAR(255),
    content_json JSONB NOT NULL,
    local_context_type VARCHAR(50) DEFAULT 'GENERIC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Worksheets Table
CREATE TABLE worksheets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
    grade INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    instructions_bi JSONB NOT NULL,
    questions_json JSONB NOT NULL,
    answer_key_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Student Progress & Learning Profiles Table
CREATE TABLE student_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    topic VARCHAR(255) NOT NULL,
    mastery_score NUMERIC(4,3) DEFAULT 0.000,
    attempts_count INT DEFAULT 0,
    mistakes_summary JSONB,
    needs_remediation BOOLEAN DEFAULT FALSE,
    last_assessment_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Content Packs Table
CREATE TABLE content_packs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language_code VARCHAR(20) NOT NULL,
    grade INT NOT NULL,
    version VARCHAR(20) NOT NULL,
    manifest_json JSONB NOT NULL,
    file_checksum VARCHAR(64) NOT NULL,
    package_url TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Sync Queue Table
CREATE TABLE sync_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL,
    action VARCHAR(20) NOT NULL,
    payload_json JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    retry_count INT DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE
);

-- 12. Audit Logs Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for lightning fast queries
CREATE INDEX idx_curriculum_grade_subject ON curriculum(grade, subject);
CREATE INDEX idx_language_terms_lookup ON language_terms(language_code, term_hi);
CREATE INDEX idx_student_progress_student ON student_progress(student_id);
CREATE INDEX idx_sync_queue_status ON sync_queue(status);
