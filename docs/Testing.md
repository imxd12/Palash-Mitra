# PALASH MITRA: Testing Strategy & Verification Protocol

---

## 1. Multi-Tier Testing Strategy
To guarantee flawless execution during live Smart India Hackathon demonstrations and real-world school trials, PALASH MITRA implements 5 testing layers:

1. **Unit Tests**:
   - `LanguageRegistry`: Ensures all 4 providers are registered and deliver valid Unicode scripts.
   - `SanthaliProvider`: Tests exact match dictionary lookups, Latin transliteration, and confidence scoring.
   - `TranslationQualityEngine`: Validates against malformed inputs and ensures honest confidence scores.
   - `SpeechService`: Ensures microsecond timer calculates $STT + Trans + TTS = Total < 3000\text{ ms}$.

2. **Offline Simulation Tests**:
   - Disconnecting network interface (`navigator.onLine = false` or UI simulation toggle).
   - Verifying that Smart Teach, Worksheets, Flashcards, and Terminology lookups continue uninterrupted.
   - Verifying that actions are written to `sync_queue` and not dropped.

3. **Device Performance Tests (2GB RAM Profile)**:
   - Memory footprint stays below 120 MB RAM in browser.
   - App shell startup time < 1.5 seconds.

4. **Running Backend Tests**:
   ```bash
   cd backend
   npm run test
   ```
