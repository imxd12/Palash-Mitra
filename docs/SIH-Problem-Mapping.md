# PALASH MITRA: Problem Statement Requirements Traceability Matrix
## SIH Problem Statement PS-26042 | Government of Jharkhand

| # | SIH Problem Statement Challenge | PALASH MITRA Implemented Solution | Architecture & Verification |
|---|---|---|---|
| 1 | **Hindi-medium teachers teaching tribal mother-tongue students** | **AI Language Bridge & Voice Classroom**: Real-time bidirectional speech & text translation between Hindi and Santhali (*Ol Chiki*), Ho, and Mundari. | Verified in `SpeechService.ts` & `VoiceClassroomView.tsx`. Measured latency < 3s. |
| 2 | **Low digital NLP resources for tribal languages** | **Language Knowledge Bank & Teacher Correction Loop**: Human-in-the-loop pipeline allowing teachers to edit translations, building a verified ground-truth dataset over time. | Implemented in `knowledgeBankController.ts` with 4-tier verification status. |
| 3 | **Unreliable / absent rural internet connectivity** | **100% Offline-First Architecture**: Compressed grade-wise Content Packs, IndexedDB local storage, and offline action sync queue with manifest diffing. | Implemented in `localDb.ts` & `sw.js`. Functions with zero network requests. |
| 4 | **Low-cost hardware (2GB RAM devices)** | **Lightweight Client Architecture**: Zero-heavy ML on device, Vanilla CSS design tokens, sub-1.2MB PWA bundle, off-thread asynchronous storage. | Benchmarked in `Performance.md`. |
| 5 | **Teachers lack time / expertise for bilingual pedagogy** | **✨ Smart Teach 1-Click Pack Generator**: Generates bilingual objectives, village examples, paper activities, visual diagrams, worksheets, and quizzes in 1 click. | Implemented in `AIService.ts` & `SmartTeachView.tsx`. |
| 6 | **Curriculum alignment across primary grades** | **Curriculum Engine (Grades 1–10)**: Strict mapping to JCERT competencies, chapters, topics, and learning outcomes across Maths, EVS, Science, and Literacy. | Implemented in `seedCurriculum.ts` & `curriculumController.ts`. |
| 7 | **Student learning gaps & high dropout rates** | **Personalized Learning & Remediation Engine**: Pinpoints specific conceptual weaknesses (e.g. 2-digit borrowing subtraction) and recommends concrete culturally rooted remedies. | Implemented in `remediationController.ts` (Birsa Murmu case study). |
| 8 | **Authentic indigenous script representation** | **Authentic Ol Chiki Typography Engine**: Unicode-compliant rendering of Ol Chiki script (`U+1C50 - U+1C7F`) alongside Romanized transliteration for teachers. | Integrated in `OlChikiText.tsx` & Google Fonts. |
| 9 | **District / State administrative oversight** | **District Admin & AI Evaluation Lab**: Aggregates school usage, offline activity ratios, human translation approval rates, and terminology verification logs. | Implemented in `AdminPortalView.tsx`. |
