# PALASH MITRA: REST API Specification
## Version 1.0.0 | Base Path: `/api/v1`

---

## 1. Authentication Endpoints

### `POST /api/v1/auth/login`
- **Request Body**: `{ email: string, password?: string }`
- **Response**: `{ success: true, token: string, user: UserProfile }`

### `GET /api/v1/auth/demo-accounts`
- **Response**: List of pre-seeded accounts for Teacher, Headmaster, Language Expert, and District Admin.

---

## 2. Curriculum Endpoints

### `GET /api/v1/curriculum`
- **Query Params**: `grade` (number), `subject` (string)
- **Response**: Array of curriculum items matching grade and subject.

### `GET /api/v1/curriculum/grades-subjects`
- **Response**: Mapped matrix of available grades (1 to 10) and subjects.

---

## 3. Translation & Voice Endpoints

### `POST /api/v1/translation/translate`
- **Request Body**: `{ text: string, sourceLang?: string, targetLang?: string }`
- **Response**:
  ```json
  {
    "success": true,
    "result": {
      "sourceText": "भिन्न",
      "translatedText": "ᱦᱟᱹᱴᱤᱧ",
      "transliterationLatin": "Hāṭiñ",
      "confidence": 0.98,
      "confidenceLevel": "HIGH",
      "source": "VERIFIED_MEMORY",
      "measuredLatencyMs": 14
    }
  }
  ```

### `POST /api/v1/voice/process`
- **Request Body**: `{ transcriptText: string, speaker: "TEACHER" | "STUDENT", sourceLanguage: string, targetLanguage: string, clientSttLatencyMs?: number }`
- **Response**: Full latency breakdown: `sttMs`, `translationMs`, `ttsMs`, `totalLatencyMs`.

---

## 4. Pedagogy & Smart Teach Endpoints

### `POST /api/v1/pedagogy/smart-teach`
- **Request Body**: `{ grade: number, subject: string, topic: string, localContext: string, targetLanguage: string }`
- **Response**: Complete bilingual classroom pack (objectives, explanation, village example, activity, visual steps, worksheet, flashcards, quiz, homework, remediation).

### `POST /api/v1/pedagogy/explain-again`
- **Request Body**: `{ grade: number, subject: string, topic: string, currentText: string, level: "SIMPLER" | "VILLAGE_EXAMPLE" | "VISUAL" }`
- **Response**: Simpler explanation, Santhali Ol Chiki translation, and illustrative example.

---

## 5. Knowledge Bank & Synchronization

### `GET /api/v1/knowledge-bank/terms`
- **Query Params**: `lang`, `category`, `status`, `search`
- **Response**: Filtered list of verified and reviewed terms.

### `POST /api/v1/knowledge-bank/correct`
- **Request Body**: `{ termHi: string, correctedTargetScript: string, correctedTargetLatin?: string, lang: string }`
- **Response**: Confirmation and updated translation memory.

### `POST /api/v1/sync/queue`
- **Request Body**: `{ queue: SyncItem[] }`
- **Response**: `{ processedCount: number, acknowledgedIds: string[], conflicts: any[] }`
