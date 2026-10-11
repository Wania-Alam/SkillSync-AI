# SkillSync AI — Technical Documentation

## 1. System Overview

SkillSync AI is an AI-based resume screening and skill gap analysis web application. It compares a candidate's resume with a job description provided by the user and generates structured analysis results.

The application consists of a React frontend, a FastAPI backend, NLP-based skill extraction, a machine-learning resume classifier, a PDF parser, and a rule-based resume quality analyzer.

## 2. System Architecture

The system follows a frontend-backend architecture.

- **Frontend:** React and Vite provide the user interface.
- **Backend:** FastAPI exposes endpoints for resume analysis and related operations.
- **PDF processing:** `pypdf` extracts text from uploaded PDF resumes.
- **Skill extraction:** Python text processing, skill vocabulary, and normalization rules identify skills.
- **Resume classification:** A trained TF-IDF feature pipeline and Linear Support Vector Machine (SVM) classifier predict a resume category.
- **Resume quality analysis:** Rule-based checks evaluate content length and the presence of common resume sections.
- **Data processing:** pandas and Jupyter notebooks support preprocessing and experimentation.

## 3. Resume Analysis Workflow

1. The user opens the Analyze page.
2. The user uploads a PDF resume and enters a job description.
3. The frontend sends the submitted data to the FastAPI backend.
4. The backend validates the input and extracts resume text from the PDF.
5. The skill extraction module identifies and normalizes skills in the resume and job description.
6. The matching module compares detected resume skills with job-description skills.
7. The backend calculates the skill-match percentage and identifies matched, missing, and additional skills.
8. The resume quality analyzer evaluates text length and section presence.
9. The classifier predicts the resume category.
10. The backend returns the results to the frontend, where they are displayed to the user.

## 4. Backend Modules

### `src/main.py`

Defines the FastAPI application, API routes, request handling, file uploads, and coordination between analysis modules.

### `src/resume_parser.py`

Uses `pypdf` to extract text from PDF pages and combines the extracted text for downstream processing.

### `src/skill_extraction.py`

Contains skill vocabulary processing, aliases and normalization, skill extraction, resume-to-job-description matching, and skill-gap logic.

### `src/resume_classifier.py`

Loads the saved TF-IDF vectorizer and trained classifier, cleans resume text, and predicts a resume category.

### `src/resume_quality.py`

Calculates text statistics, checks for common resume sections, and generates rule-based quality indicators.

## 5. Machine-Learning Approach

### TF-IDF

Term Frequency–Inverse Document Frequency (TF-IDF) converts cleaned resume text into numerical features that can be processed by a machine-learning classifier.

### Linear Support Vector Machine

A Linear SVM uses the TF-IDF features to predict a resume category. During project experimentation, the reported classification accuracy was approximately **73.24%**. This is an experimental result, not a guarantee of performance on unseen real-world resumes.

### Saved artifacts

- `models/resume_classifier.pkl`
- `models/tfidf_vectorizer.pkl`

These artifacts must be available at the paths expected by the classifier module. Compatible Python and scikit-learn versions should be used when loading serialized models.

## 6. Skill Matching and Gap Analysis

The skill extraction module identifies terms that match the configured skill vocabulary and applies normalization rules to related names and aliases.

The matching module compares the extracted resume skills against the job-description skills. The application reports:

- **Matched skills:** Skills detected in both the resume and the job description.
- **Missing skills:** Skills detected in the job description but not detected in the resume.
- **Additional skills:** Resume skills not included in the detected job-description skill set.
- **Skill-match percentage:** A score calculated using the matching logic implemented in the backend.

The score depends on the extraction vocabulary and matching rules. It should not be interpreted as a probability of being hired.

## 7. Resume Quality Analysis

The quality analyzer calculates word, sentence, and character counts and checks for sections such as:

- Contact information
- Education
- Experience
- Skills
- Summary or objective
- Projects
- Certifications

The results are rule-based indicators. They do not replace a professional review of resume content.

## 8. API Layer

FastAPI exposes endpoints for health checks, skill extraction, matching, skill-gap analysis, resume quality analysis, classification, PDF upload, and combined resume screening.

The unified `/analyze-resume` endpoint provides a consolidated resume analysis. The `/screen-resume` endpoint accepts a PDF resume and a user-provided job description for screening.

The exact request formats and response schemas are available from the running backend's interactive API documentation at `/docs`.

## 9. Frontend

The React frontend includes the following pages:

- **Home:** Introduces SkillSync AI and its features.
- **About:** Explains the project's purpose and capabilities.
- **FAQ:** Answers common questions about the system.
- **Analyze:** Accepts a PDF resume and job description and displays the analysis results.

The frontend communicates with the FastAPI backend through HTTP requests. The backend CORS configuration permits the configured local frontend origins during development.

## 10. Data and Notebooks

The `data/raw/` directory contains source
