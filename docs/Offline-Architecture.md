# PALASH MITRA: Offline-First Architecture & Sync Engine

---

## 1. Operating in Rural Zero-Connectivity Environments
Schools in remote blocks of Jharkhand (e.g. Murhu, Torpa, Khunti) face frequent power outages and absent cellular networks. PALASH MITRA guarantees that 100% of core teaching workflows run locally on low-cost devices (approximately 2 GB RAM):
- Lesson planning & viewing
- Santhali (Ol Chiki) translation from local memory
- Audio pronunciation playback from offline sound assets
- Bilingual worksheet and flashcard generation
- Student quiz assessment and remediation diagnosis
- Teacher correction logging

---

## 2. Offline Storage Hierarchy

```
+-------------------------------------------------------------------------------+
|                             CLIENT STORAGE LAYERS                             |
|                                                                               |
|  1. Service Worker Cache Storage                                              |
|     - Pre-caches App Shell, HTML, CSS, JavaScript bundles, Web Fonts          |
|                                                                               |
|  2. Client IndexedDB (`palash_mitra_offline_db`)                              |
|     - `content_packs`: Grade-wise compressed curriculum and lessons           |
|     - `terms_memory`: Verified Ol Chiki and regional tribal vocabulary       |
|     - `cached_lessons`: Smart Teach generated lessons                         |
|     - `sync_queue`: Actions performed offline awaiting network sync           |
|                                                                               |
|  3. LocalStorage & SessionStorage                                             |
|     - Authentication tokens and offline simulation flags                      |
+-------------------------------------------------------------------------------+
```

---

## 3. Smart Content Pack Manifest Diffing
Instead of redownloading large files, PALASH MITRA uses manifest checksum diffing:
1. Server publishes `ContentPack` with version and SHA-256 hash.
2. Client checks `POST /content-packs/check-diff` with `{ packId, localVersion, localChecksum }`.
3. Server returns only delta items if changes exist, minimizing data costs.

---

## 4. Conflict-Aware Synchronization Queue
When connectivity returns:
1. Client pushes pending items from `sync_queue` to `POST /api/v1/sync/queue`.
2. Server validates authentication and role permissions.
3. **Conflict Arbitration**:
   - If a teacher modified a term that was officially locked by State authorities while offline, the server records an audit conflict for expert review instead of silently overwriting.
   - For student assessment scores, the latest timestamp is merged.
4. Server returns `acknowledgedIds`, and client removes them from the local queue.
