# PALASH MITRA: High-Level System Architecture
## SIH Problem Statement: PS-26042 | Government of Jharkhand

---

## 1. Architectural Philosophy: An Educational Operating System
Unlike single-purpose translation apps or basic chatbots, PALASH MITRA is architected as an **integrated pedagogical operating system** for government primary schools in Jharkhand. It treats language translation not as an isolated linguistic conversion, but as an embedded pedagogical bridge connecting Hindi-medium teachers with tribal students speaking Santhali (*Ol Chiki*), Ho (*Warang Chiti*), and Mundari.

---

## 2. Multi-Tier Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                           1. PRESENTATION LAYER                                   |
|                                                                                   |
|  [Teacher Classroom OS (Tablet / Mobile)]       [District Admin & AI Eval Lab]   |
|   - ✨ Smart Teach (1-Click Bundle)               - Terminology Approval Pipeline  |
|   - Real-Time Voice Classroom                     - Content Pack Studio & Diff     |
|   - Teacher AI Copilot & Explain Again            - Human Approval Rate Analytics  |
|   - Bilingual Worksheet & Printable View          - Offline School Synchronization |
|   - Personalized Remediation Engine               - Audit & Access Control Logs    |
+-----------------------------------------------------------------------------------+
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
+------------------------------------+   +------------------------------------------+
|      2. CLOUD BACKEND (REST API)   |   |        3. OFFLINE CLIENT EDGE CORE       |
|                                    |   |                                          |
| - Express.js Clean Architecture    |   | - Service Worker App Shell Caching       |
| - JWT Auth & Role-Based RBAC       |   | - IndexedDB / LocalStorage Engine        |
| - LanguageRegistry Engine          |   | - Local Translation Memory (Exact Match) |
| - Terminology Knowledge Bank       |   | - Offline Action Sync Queue              |
| - Content Pack Manifest Generator  |   | - Offline Worksheet & Quiz Templates     |
| - Speech & Latency Instrumentation |   | - Device Optimization for 2GB RAM        |
+------------------------------------+   +------------------------------------------+
                  │                                               │
                  ▼                                               ▼
+------------------------------------+   +------------------------------------------+
|          4. AI & NLP LAYER         |   |          5. PERSISTENCE LAYER            |
|                                    |   |                                          |
| - Pluggable IAIProvider Interface  |   | - PostgreSQL / SQLite Relational DB      |
| - CloudAIProvider (Gemini/Indic)   |   | - IndexedDB Client Stores                |
| - TemplateAndLocalAIProvider       |   | - Compressed Content Packs (.json/.bin)  |
| - TranslationQualityEngine         |   | - Audit Log Store                        |
+------------------------------------+   +------------------------------------------+
```

---

## 3. Core Architectural Subsystems

### 3.1 Pluggable Language System
The platform decouples business logic from any specific language through the `ILanguageProvider` interface. Initial implementations support:
- `HindiProvider`: Source instructional language.
- `SanthaliProvider`: Target tribal language rendered in authentic Ol Chiki Unicode (`᱐-᱙, ᱚ, ᱛ, ᱜ...`) with Latin transliteration and IPA phonetics.
- `HoProvider`: Warang Chiti script support.
- `MundariProvider`: Mundari regional dialect support.

### 3.2 Real-Time Voice Classroom Pipeline
```
Teacher Speaks (Hindi) 
   ──► [WebSpeech STT] (T1) 
   ──► [Translation Memory / Model] (T2) 
   ──► [TTS Synthesis] (T3) 
   ──► Student Audio Playback (Total Latency: T3 - T0 < 3.0s)
```

### 3.3 Human-in-the-Loop Terminology Lifecycle
Tribal languages are low-resource datasets where automatic AI output often lacks dialectal nuance. The system implements a 4-tier lifecycle:
1. `AI_GENERATED`: Machine-generated translation candidate.
2. `TEACHER_REVIEWED`: Modified by a classroom educator during real teaching.
3. `LANGUAGE_EXPERT_VERIFIED`: Validated by a linguist or Santhali cultural authority.
4. `OFFICIALLY_APPROVED`: Approved by Jharkhand Academic Council (JAC) / JCERT.
