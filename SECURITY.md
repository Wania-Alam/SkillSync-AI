# Security Policy

## Supported Versions

We actively support and patch security vulnerabilities in the following versions of **SkillSync AI**:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Known Security Boundaries (Educational Project Disclaimer)

SkillSync AI is an **educational project** and a decision-support prototype. It has not undergone production-grade security hardening. If you deploy this application publicly, be aware of the following architectural limitations:

### 1. Serialized Model Files (Pickle/Joblib)
* **Risk:** The project loads machine-learning artifacts (`models/resume_classifier.pkl` and `models/tfidf_vectorizer.pkl`) using `joblib`. Loading untrusted pickle or joblib files can lead to **Arbitrary Code Execution**.
* **Mitigation:** Only use the model files provided directly within this repository. Never replace these files with models downloaded from untrusted or unverified third-party sources.

### 2. PDF Parsing (`pypdf`)
* **Risk:** The backend processes raw user-uploaded binary files using `pypdf`. Malformed or maliciously crafted PDFs can potentially trigger Denial of Service (DoS) or memory exhaustion on the host backend server.
* **Mitigation:** In production environments, file uploads should be limited by size at the reverse-proxy level (e.g., Nginx) and sandboxed appropriately.

### 3. Local Deployment
* **Risk:** By default, the FastAPI backend run command (`uvicorn src.main:app --reload`) is meant for a local development loop. It does not include production rate-limiting, Cross-Origin Resource Sharing (CORS) hardening, or HTTPS configurations out-of-the-box.

---

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please report it responsibly:

1. **Do not** open a public GitHub Issue for security vulnerabilities.
2. Email your findings directly to the project maintainer at **waniya1423@gmail.com**.
3. Please include a detailed description of the issue, steps to reproduce, and a proof of concept (PoC) if available.

We appreciate your help in keeping this project safe and will review your report as quickly as possible.
