# PALASH MITRA: AI & NLP Architecture
## Low-Resource Vernacular Pedagogy & Speech Engineering

---

## 1. Multi-Tier AI Provider Abstraction
PALASH MITRA avoids hard-coding any specific vendor API (such as OpenAI, Gemini, or Bhashini). Instead, the system routes requests through an `AIServiceRouter`:

```
                 [Educational Generation Request]
                                │
                                ▼
                       [AIServiceRouter]
                                │
                   Is Internet Available & Key Set?
                   ├── YES ──► [CloudAIProvider] (Gemini 1.5 / IndicTrans2)
                   │                 │
                   │                 ▼
                   │           [TranslationQualityEngine]
                   │
                   └── NO  ──► [TemplateAndLocalAIProvider]
                                     │
                                     ├── Level 1: Verified Translation Memory
                                     ├── Level 2: Rule-Based Dictionary Lookups
                                     └── Level 3: Curriculum Template Engine
```

---

## 2. Structured Prompt Engineering Architecture
All educational generation requests adhere to strict JSON schema validation. The prompt context always contains:
```typescript
{
  grade: number;                  // 1 to 10
  subject: string;                // 'Mathematics', 'Science', 'EVS'
  topic: string;                  // 'Fractions', 'Parts of a Plant'
  learningOutcome?: string;       // Competency statement
  sourceLanguage: string;         // 'hi'
  targetLanguage: string;         // 'sat', 'hoc', 'unr'
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'CHALLENGE';
  localContext: 'GENERIC' | 'VILLAGE' | 'AGRICULTURE' | 'FOREST' | 'SCHOOL';
  studentLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  durationMinutes: number;        // e.g. 40
}
```

---

## 3. Translation Quality Engine
Low-resource machine translation can suffer from hallucinations, phonetic mismatches, or omission of critical curriculum terms. The `TranslationQualityEngine` executes automated quality gates:
1. **Empty / Malformed Check**: Flags empty or single-character anomalies.
2. **Untranslated Token Detection**: Detects tokens where target script equals source Hindi and reduces confidence accordingly.
3. **Appropriateness Filter**: Prevents inappropriate or derogatory terminology.
4. **Honest Confidence Scoring**: Outputs `HIGH` (>= 0.8), `MEDIUM` (0.5 - 0.79), or `LOW` (< 0.5) to inform the teacher whether human verification is required.

---

## 4. Measured Speech Latency Instrumentation
Latency is tracked honestly using runtime performance timers:
$$\text{Total Latency} = \text{STT}_{\text{ms}} + \text{Translation}_{\text{ms}} + \text{TTS}_{\text{ms}}$$
- **SLA Benchmark**: Total latency $\le 3000\text{ ms}$ for real-time classroom conversation.
- **Microsecond Precision**: Calculated via `performance.now()`.
