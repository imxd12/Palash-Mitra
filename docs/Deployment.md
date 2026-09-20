# PALASH MITRA: Deployment & DevOps Architecture

---

## 1. Local Development Run
```bash
# 1. Clone repository
git clone https://github.com/jharkhand-gov/palash-mitra.git
cd "palash-mitra"

# 2. Run Backend
cd backend
npm install
npm run dev
# Server listening on http://localhost:5000

# 3. Run Frontend
cd ../frontend
npm install
npm run dev
# Web application accessible on http://localhost:5173
```

---

## 2. Low-Cost Android Tablet Deployment (TWA)
For government deployments across rural schools:
1. The frontend is built as an installable **Progressive Web App (PWA)** with a registered Service Worker.
2. An Android **Trusted Web Activity (TWA)** wrapper can be built via Bubblewrap / Android Studio to produce an `.apk` installable on Android 9+ tablets with 2 GB RAM.
3. Once opened, the teacher taps "Install App" or downloads the Grade 1–5 content packs. The entire application shell is cached into local IndexedDB and CacheStorage for zero-network execution.

---

## 3. Production Cloud Deployment (Docker)
A multi-container setup via Docker Compose:
- **`palash-backend`**: Node.js 20 Alpine container running on port 5000.
- **`palash-frontend`**: Nginx Alpine serving static build with HTTP/2 and Brotli compression.
- **`palash-db`**: PostgreSQL 16 container with persistent volumes.
