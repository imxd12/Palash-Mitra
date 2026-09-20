# PALASH MITRA: Security, Privacy & Compliance Architecture

---

## 1. Threat Model & Educational Data Protection
In primary education deployments, protecting student privacy and preventing unauthorized access to school infrastructure is critical:
- **Zero Personally Identifiable Information (PII) Exposure**: Students are tracked by anonymous class roll numbers and IDs (`Birsa Murmu - Roll 01`); no biological, medical, or psychological diagnosis is ever collected.
- **Audio Privacy**: Temporary speech buffers are processed in-memory and discarded immediately after STT/TTS synthesis. No ambient recordings are persistently stored without explicit teacher confirmation.

---

## 2. Role-Based Access Control (RBAC)

| Role | Access Permissions |
|---|---|
| `TEACHER` | Generate lessons, run Voice Classroom, print worksheets, view class progress, submit terminology corrections. |
| `SCHOOL_ADMIN` | View teacher roster, class sync metrics, approve local device pairing. |
| `LANGUAGE_EXPERT` | Review and verify teacher-submitted terminology corrections, approve phonetic guides. |
| `DISTRICT_ADMIN` | View aggregated district analytics, audit logs, manage school deployments. |
| `SYSTEM_ADMIN` | Full infrastructure access, content pack publisher keys, system diagnostics. |

---

## 3. Cryptographic Measures
- **Authentication**: JWT signed with HMAC-SHA256 and configurable expiration.
- **Password Hashing**: Bcrypt with work factor 10.
- **Content Integrity**: Every offline content pack is protected by a SHA-256 cryptographic checksum to prevent file corruption or tampering.
- **Audit Logging**: Sensitive changes (terminology approvals, user permission modifications) are saved to tamper-evident audit logs with user ID, action, and timestamp.
