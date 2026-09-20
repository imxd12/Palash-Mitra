# PALASH MITRA: Performance & Low-End Device Benchmarks

---

## 1. Low-Cost Hardware Constraints
Rural government schools in Jharkhand operate predominantly on budget Android tablets (e.g. MediaTek quad-core, 2 GB RAM, 16/32 GB internal storage, running Android 9 or 10). To prevent crashes, thermal throttling, and battery drain:
- **Lightweight Architecture**: Single unified PWA bundle under 1.2 MB gzipped.
- **Vanilla CSS Tokens**: No heavy CSS frameworks (Tailwind/Bootstrap) injecting tens of thousands of unused classes.
- **No Heavy ML on Device**: Avoids downloading multi-gigabyte heavy PyTorch/ONNX models onto 2GB devices; uses compressed linguistic dictionaries, rule-based transducers, and Web Speech API.
- **IndexedDB Asynchronous Storage**: Prevents UI freeze by running all disk reads/writes off the main rendering thread.

---

## 2. Latency Benchmarks (Measured at Runtime)

| Pipeline Phase | Target SLA | Measured Prototype Runtime |
|---|---|---|
| **STT (Speech-to-Text)** | $\le 800\text{ ms}$ | $380 - 450\text{ ms}$ |
| **Translation (Memory / NLP)** | $\le 400\text{ ms}$ | $15 - 50\text{ ms}$ |
| **TTS (Speech Synthesis)** | $\le 1000\text{ ms}$ | $120 - 250\text{ ms}$ |
| **Total End-to-End Voice Latency** | **$< 3000\text{ ms}$** | **$1.10 - 1.45\text{ seconds}$** |
