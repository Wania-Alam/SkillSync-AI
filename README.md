# SkillSync AI

**AI-Based Resume Screening and Skill Gap Analysis**

SkillSync AI is a web application that analyzes a candidate's PDF resume against a job description supplied by the user. It extracts skills, compares the resume with the job requirements, identifies missing skills, evaluates resume structure and content, and predicts a resume category using a trained machine-learning classifier.

## Contents

- [Project objectives](#project-objectives)
- [Features](#features)
- [How it works](#how-it-works)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Setup and run locally](#setup-and-run-locally)
- [API endpoints](#api-endpoints)
- [Data and machine-learning artifacts](#data-and-machine-learning-artifacts)
- [Testing](#testing)
- [Limitations](#limitations)
- [Future improvements](#future-improvements)

## Project objectives

The project aims to make resume review more structured by helping users:

1. Compare a resume with a specific job description.
2. See skills detected in the resume and skills mentioned in the job description.
3. Identify potential skill gaps.
4. Review basic resume quality indicators, including section presence and content length.
5. Receive a machine-learning prediction of the resume's professional category.

SkillSync AI is an educational project and should be used as decision support, not as the sole basis for hiring decisions.

## Features

### Resume screening and job-description matching
- Accepts a PDF resume and a job description entered by the user.
- Extracts readable text from the PDF.
- Detects skills in the resume and job description.
- Reports matched, missing, and additional skills.
- Calculates a skill-match percentage based on the matching logic implemented by the backend.

### Skill gap analysis
- Lists skills identified in the job description that were not detected in the resume.
- Helps users identify areas they may want to develop or describe more clearly in their resume.

### Resume quality analysis
- Counts words, sentences, and characters.
- Checks for core sections such as contact information, education, experience, and skills.
- Checks optional sections such as summary/objective, projects, and certifications.
- Produces quality indicators based on the implemented rules.

### Resume classification
- Uses a trained TF-IDF feature pipeline and a Linear Support Vector Machine classifier to predict a resume category.

### Web interface
- Home, About, FAQ, and Analyze pages.
- PDF upload and job-description input.
- Loading/progress feedback and results presentation.
- Option to analyze another resume.

## How it works

1. The user uploads a PDF resume and enters a job description.
2. The FastAPI backend extracts text from the PDF.
3. The backend extracts and normalizes skills from the resume and job description.
4. It compares the detected skills and calculates matching and missing-skill results.
5. It runs resume quality checks and predicts a resume category.
6. The React interface displays the analysis results.

## Technology stack

**Frontend**
- React
- JavaScript
- Vite
- React Router
- CSS

**Backend**
- Python
- FastAPI
- Uvicorn
- `python-multipart` for file/form uploads
- `pypdf` for PDF text extraction
- pandas for data processing

**Machine learning**
- scikit-learn
- TF-IDF vectorization
- Linear Support Vector Machine (SVM)
- joblib for loading serialized model artifacts

## Project structure

```text
SkillSync AI/
├── data/
│   ├── raw/
│   │   ├── README.md
│   │   └── skills/
│   │       └── README.md
│   └── processed/
│       ├── README.md
│       ├── resumes_clean.csv
│       ├── skills_clean.csv
│       └── resume_skills.csv
├── docs/
│   └── phase_11_fastapi_backend.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── models/
│   ├── resume_classifier.pkl
│   └── tfidf_vectorizer.pkl
├── notebooks/
│   ├── 01_resume_preprocessing.ipynb
│   ├── 02_skills_preprocessing.ipynb
│   ├── 03_skill_extraction.ipynb
│   ├── 04_resume_skill_extraction.ipynb
│   ├── 05_resume_classification.ipynb
│   ├── 06_resume_jd_matching.ipynb
│   ├── 07_skill_gap_analysis.ipynb
│   └── 08_resume_quality_analyzer.ipynb
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── skill_extraction.py
│   ├── resume_parser.py
│   ├── resume_classifier.py
│   └── resume_quality.py
├── tests/
│   ├── create_test_pdf.py
│   └── test_parser.py
├── .gitignore
├── requirements.txt
└── README.md
```

The structure above describes the expected project layout; omit any listed generated file that is not present in your local copy.

## Requirements

- Python 3.10 or later is recommended.
- Node.js and npm compatible with the installed Vite version.
- The Python dependencies listed in `requirements.txt`.
- The trained model files in `models/`.

## Setup and run locally

### 1. Get the project

Clone your repository or open the project directory locally. Run all commands from the project root unless noted.

### 2. Install Python dependencies

```powershell
pip install -r requirements.txt
```

If you use a virtual environment, activate it before installing the packages.

### 3. Start the backend

From the project root:

```powershell
uvicorn src.main:app --reload
```

The API should be available at:

- API base: `http://127.0.0.1:8000`
- Interactive API documentation: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/health`

Keep this terminal open while using the frontend.

### 4. Install frontend dependencies

Open a second terminal:

```powershell
cd frontend
npm install
```

### 5. Start the frontend

In the `frontend` directory:

```powershell
npm run dev
```

Open the local URL printed by Vite, commonly `http://localhost:5173`.

### 6. Use the application

1. Open the Analyze page.
2. Select a PDF resume.
3. Enter the target job description.
4. Start the analysis.
5. Review the match score, matched skills, missing skills, and resume analysis.
6. Select **Analyze Another Resume** to run a new analysis.

## API endpoints

The backend includes the following endpoints. Upload and screening endpoints accept multipart form data where applicable.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Basic API welcome/availability response. |
| `GET` | `/health` | Health check. |
| `POST` | `/extract-skills` | Extract skills from submitted text. |
| `POST` | `/match-resume` | Compare resume text with a job description. |
| `POST` | `/skill-gap` | Return skill-gap results. |
| `POST` | `/resume-quality` | Analyze resume content and section indicators. |
| `POST` | `/classify-resume` | Predict a resume category. |
| `POST` | `/upload-resume` | Upload and parse a resume. |
| `POST` | `/upload-resume-skills` | Upload a resume and extract skills. |
| `POST` | `/upload-resume-quality` | Upload a resume and run quality analysis. |
| `POST` | `/upload-resume-classify` | Upload a resume and predict its category. |
| `POST` | `/analyze-resume` | Run the unified resume-analysis workflow. |
| `POST` | `/screen-resume` | Screen a PDF resume against a supplied job description. |

See `http://127.0.0.1:8000/docs` for live request schemas and response formats. Confirm endpoint behavior against `src/main.py` if the implementation changes.

## Data and machine-learning artifacts

- `data/raw/` contains the source datasets. The original CSV files are excluded from GitHub according to the project's `.gitignore`; follow the dataset's license and privacy terms when sharing data.
- `data/processed/` contains prepared CSV outputs used during development and analysis.
- `notebooks/` records the preprocessing, skill extraction, classification, matching, and quality-analysis workflow.
- `models/resume_classifier.pkl` and `models/tfidf_vectorizer.pkl` are required by the resume-classification module.

The serialized model files should be kept together with compatible scikit-learn/joblib dependencies. Only load pickle/joblib files from sources you trust.

## Testing

The project was integration-tested against the main application flows, including:

- End-to-end resume analysis.
- Different resume/job-description combinations.
- Low and high skill overlap.
- Short or incomplete resume content.
- Invalid PDF upload.
- Empty job description.
- Resetting the analysis to analyze another resume.
- Frontend navigation and stability.

For a frontend check, run:

```powershell
cd frontend
npm run lint
npm run build
```

For parser-specific checks, review `tests/test_parser.py` and run it according to the imports and test setup in your local project.

## Limitations

- Skill extraction depends on the configured vocabulary, aliases, and matching rules. It may miss skills or detect terms incorrectly.
- PDF text extraction can be limited for scanned/image-only PDFs or unusual layouts.
- Resume quality results are rule-based indicators, not a definitive assessment of a candidate.
- A predicted resume category and skill-match percentage are not guarantees of job suitability or hiring outcomes.
- The system does not independently verify candidate claims.
- The current core version does not include job recommendations, interview preparation, or a market-trend career simulator.

## Future improvements

Potential future work includes:
- Exporting analysis results as a downloadable report.
- Improving extraction for scanned PDFs using OCR.
- Expanding and evaluating the skill vocabulary.
- Adding broader evaluation datasets and metrics.
- Adding job recommendations or interview preparation as separate modules.
- Improving security, deployment configuration, and production monitoring.

## Disclaimer

SkillSync AI is an academic project intended for learning and decision support. Its output should be reviewed by a person and should not be treated as a definitive hiring recommendation.
