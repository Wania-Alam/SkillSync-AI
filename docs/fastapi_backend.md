#  FastAPI Backend

The objective of Phase 11 was to convert the machine learning and NLP components developed in the previous phases into a functional FastAPI backend.

The backend provides API endpoints for resume parsing, skill extraction, resume classification, resume quality analysis, Resume-to-Job Description matching, and skill gap analysis.

## Backend Architecture

The backend follows this general workflow:

```text
User Resume
     ↓
PDF Upload
     ↓
PDF Text Extraction
     ↓
Resume Analysis
     ├── Skill Extraction
     ├── Resume Classification
     └── Resume Quality Analysis
     ↓
Job Description
     ↓
Resume ↔ Job Description Matching
     ↓
Skill Match + Skill Gaps
```

## Main Backend Components

### 1. Resume Parser

File:

`src/resume_parser.py`

The resume parser extracts textual content from uploaded PDF resumes using `pypdf`.

The extracted text is cleaned before being passed to the downstream NLP components.

Main function:

`extract_text_from_pdf()`

---

### 2. Skill Extraction

File:

`src/skill_extraction.py`

The skill extraction module identifies skills from resume text and Job Descriptions using the processed skill vocabulary.

The module also performs:

* Text normalization
* Skill alias normalization
* Exact skill matching
* Overlapping skill removal
* Skill classification
* Resume-to-JD matching

The extraction vocabulary contains technical, software/tool, and professional/domain skills.

---

### 3. Resume Classification

File:

`src/resume_classifier.py`

The resume classification component uses the trained TF-IDF vectorizer and Linear SVM classifier developed during Phase 5.

The classifier predicts the professional category of a resume based on its textual content.

The saved model files are:

* `models/resume_classifier.pkl`
* `models/tfidf_vectorizer.pkl`

The classifier was integrated into the FastAPI backend and successfully tested using a PDF resume.

---

### 4. Resume Quality Analyzer

File:

`src/resume_quality.py`

The Resume Quality Analyzer evaluates resumes using measurable and explainable indicators.

It calculates:

* Character count
* Word count
* Sentence count
* Detected resume sections
* Core section completeness
* Missing core sections
* Content-length status
* Quality indicators

The four core sections currently used are:

* Contact Information
* Education
* Experience
* Skills

Contact information can be detected through section headings as well as email addresses and phone numbers.

---

## API Endpoints

### GET `/`

Checks whether the SkillSync AI API is running.

### GET `/health`

Returns the health status of the backend.

### POST `/extract-skills`

Accepts resume text and returns extracted skills.

### POST `/match-resume`

Compares resume text with a Job Description and returns matching and missing skills.

### POST `/skill-gap`

Returns required skills, matched skills, skill gaps, additional skills, and the skill-match percentage.

### POST `/resume-quality`

Analyzes the quality and completeness of supplied resume text.

### POST `/classify-resume`

Predicts the professional category of supplied resume text.

### POST `/upload-resume`

Uploads a PDF resume and extracts its textual content.

### POST `/upload-resume-skills`

Uploads a PDF resume and extracts skills from the extracted text.

### POST `/upload-resume-quality`

Uploads a PDF resume and performs resume quality analysis.

### POST `/upload-resume-classify`

Uploads a PDF resume and predicts its professional category.

### POST `/analyze-resume`

Performs a combined resume analysis from an uploaded PDF.

The endpoint returns:

* Extracted resume information
* Predicted category
* Extracted skills
* Resume quality analysis

### POST `/screen-resume`

Accepts:

* PDF resume
* User-provided Job Description

The endpoint performs Resume-to-JD screening and returns:

* Total resume skills
* Total Job Description skills
* Matched skills
* Missing skills
* Additional skills
* Skill-match percentage

Generic Job Description terms are filtered before calculating the final match.

---

## Testing

The backend was tested using a generated test PDF resume.

The test resume contained:

* Python
* SQL
* Machine Learning
* Data Analysis
* Pandas
* NumPy
* Git
* Docker

The PDF parser successfully extracted:

* 517 characters
* 68 words

The skill extraction endpoint successfully detected 8 relevant skills.

The classifier predicted:

`ENGINEERING`

The Resume Quality Analyzer detected all four core sections:

* Contact Information
* Education
* Experience
* Skills

The PDF + Job Description screening endpoint was also successfully tested.

A controlled Job Description produced:

* 18 required skills
* 8 matched skills
* 10 missing skills
* 44.44% skill-match percentage

The result demonstrates that the backend can perform complete Resume-to-JD skill screening using an uploaded PDF and a user-provided Job Description.

---

## Error Handling

The backend validates uploaded files and rejects non-PDF files.

The screening endpoint also validates the Job Description and rejects an empty Job Description.

These cases were tested successfully.

---

## Phase 11 Status

* [x] FastAPI setup
* [x] API application
* [x] Resume text processing
* [x] Skill extraction integration
* [x] Resume classification integration
* [x] Resume quality integration
* [x] PDF parsing
* [x] PDF upload
* [x] PDF skill extraction
* [x] PDF quality analysis
* [x] PDF classification
* [x] Unified resume analysis
* [x] Resume + Job Description screening
* [x] Skill gap integration
* [x] Error handling validation
* [x] Backend testing
* [x] API documentation

## Conclusion

Phase 11 successfully converted the previously developed machine learning and NLP components into a functional FastAPI backend.

The backend can now receive resume text or PDF files, analyze resumes, extract skills, classify resumes, evaluate resume quality, and compare resumes with user-provided Job Descriptions.

The backend is now ready to serve as the API layer for the SkillSync AI web application.

**Phase 11 — FastAPI Backend: COMPLETE**
