from pathlib import Path
import pandas as pd
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.skill_extraction import (
    extract_and_classify_skills,
    build_extraction_vocabulary,
    match_resume_to_jd
)
from src.resume_quality import get_resume_quality_result
from src.resume_classifier import predict_resume_category
from src.resume_parser import extract_text_from_pdf

# --------------------------------------------------
# Project paths
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

SKILLS_FILE = (
    BASE_DIR
    / "data"
    / "processed"
    / "skills_clean.csv"
)


# --------------------------------------------------
# Load skill vocabulary
# --------------------------------------------------

skills_df = pd.read_csv(SKILLS_FILE)


# --------------------------------------------------
# FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="SkillSync AI",
    description="AI-based Resume Screening and Skill Gap Analysis API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Request models
# --------------------------------------------------

class ResumeTextRequest(BaseModel):
    resume_text: str


class ResumeJDRequest(BaseModel):
    resume_text: str
    job_description: str


# --------------------------------------------------
# Basic endpoints
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "SkillSync AI API is running",
        "status": "success"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# Skill extraction endpoint
# --------------------------------------------------

@app.post("/extract-skills")
def extract_resume_skills(request: ResumeTextRequest):

    skill_set = build_extraction_vocabulary(
        skills_df
    )

    skills = extract_and_classify_skills(
        request.resume_text,
        skill_set
    )

    return {
        "total_skills": len(skills),
        "skills": skills
    }


# --------------------------------------------------
# Resume ↔ JD matching endpoint
# --------------------------------------------------

@app.post("/match-resume")
def match_resume(request: ResumeJDRequest):

    skill_set = build_extraction_vocabulary(
        skills_df
    )

    result = match_resume_to_jd(
        resume_text=request.resume_text,
        job_description=request.job_description,
        skill_set=skill_set
    )

    return result


# --------------------------------------------------
# Skill gap analysis endpoint
# --------------------------------------------------

@app.post("/skill-gap")
def skill_gap_analysis(request: ResumeJDRequest):

    skill_set = build_extraction_vocabulary(
        skills_df
    )

    result = match_resume_to_jd(
        resume_text=request.resume_text,
        job_description=request.job_description,
        skill_set=skill_set
    )

    return {
        "required_skills": result["jd_skills"],
        "matched_skills": result["matched_skills"],
        "skill_gaps": result["missing_skills"],
        "additional_skills": result["additional_skills"],
        "skill_match_percentage": result["skill_match_percentage"]
    }

@app.post("/resume-quality")
def resume_quality_analysis(request: ResumeTextRequest):

    result = get_resume_quality_result(
        request.resume_text
    )

    return result

@app.post("/classify-resume")
def classify_resume(request: ResumeTextRequest):

    category = predict_resume_category(
        request.resume_text
    )

    return {
        "predicted_category": category
    }

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        return {
            "status": "error",
            "message": "Only PDF files are supported."
        }

    upload_directory = BASE_DIR / "temp"

    upload_directory.mkdir(
        exist_ok=True
    )

    file_path = upload_directory / file.filename

    file_contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(file_contents)

    resume_text = extract_text_from_pdf(
        file_path
    )

    return {
        "status": "success",
        "filename": file.filename,
        "extracted_characters": len(resume_text),
        "extracted_words": len(resume_text.split()),
        "resume_text": resume_text
    }

@app.post("/upload-resume-skills")
async def upload_resume_skills(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        return {
            "status": "error",
            "message": "Only PDF files are supported."
        }

    upload_directory = BASE_DIR / "temp"

    upload_directory.mkdir(
        exist_ok=True
    )

    file_path = upload_directory / file.filename

    file_contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(file_contents)

    # Extract text from PDF
    resume_text = extract_text_from_pdf(
        file_path
    )

    # Build skill vocabulary
    skill_set = build_extraction_vocabulary(
        skills_df
    )

    # Extract skills
    skills = extract_and_classify_skills(
        resume_text,
        skill_set
    )

    return {
        "status": "success",
        "filename": file.filename,
        "extracted_characters": len(resume_text),
        "extracted_words": len(resume_text.split()),
        "total_skills": len(skills),
        "skills": skills
    }

@app.post("/upload-resume-quality")
async def upload_resume_quality(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        return {
            "status": "error",
            "message": "Only PDF files are supported."
        }

    upload_directory = BASE_DIR / "temp"

    upload_directory.mkdir(
        exist_ok=True
    )

    file_path = upload_directory / file.filename

    file_contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(file_contents)

    # Extract resume text from PDF
    resume_text = extract_text_from_pdf(
        file_path
    )

    # Analyze resume quality
    quality_result = get_resume_quality_result(
        resume_text
    )

    return {
        "status": "success",
        "filename": file.filename,
        "extracted_characters": len(resume_text),
        "extracted_words": len(resume_text.split()),
        "quality_analysis": quality_result
    }

@app.post("/upload-resume-classify")
async def upload_resume_classify(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        return {
            "status": "error",
            "message": "Only PDF files are supported."
        }

    upload_directory = BASE_DIR / "temp"
    upload_directory.mkdir(exist_ok=True)

    file_path = upload_directory / file.filename

    file_contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(file_contents)

    resume_text = extract_text_from_pdf(file_path)

    predicted_category = predict_resume_category(
        resume_text
    )

    return {
        "status": "success",
        "filename": file.filename,
        "extracted_characters": len(resume_text),
        "extracted_words": len(resume_text.split()),
        "predicted_category": predicted_category
    }

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        return {
            "status": "error",
            "message": "Only PDF files are supported."
        }

    upload_directory = BASE_DIR / "temp"
    upload_directory.mkdir(exist_ok=True)

    file_path = upload_directory / file.filename

    file_contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(file_contents)

    # --------------------------------------------------
    # Step 1: Extract resume text
    # --------------------------------------------------

    resume_text = extract_text_from_pdf(file_path)

    # --------------------------------------------------
    # Step 2: Build skill vocabulary
    # --------------------------------------------------

    skill_set = build_extraction_vocabulary(
        skills_df
    )

    # --------------------------------------------------
    # Step 3: Extract skills
    # --------------------------------------------------

    skills = extract_and_classify_skills(
        resume_text,
        skill_set
    )

    # --------------------------------------------------
    # Step 4: Resume quality analysis
    # --------------------------------------------------

    quality_result = get_resume_quality_result(
        resume_text
    )

    # --------------------------------------------------
    # Step 5: Resume classification
    # --------------------------------------------------

    predicted_category = predict_resume_category(
        resume_text
    )

    # --------------------------------------------------
    # Final response
    # --------------------------------------------------

    return {
        "status": "success",
        "filename": file.filename,

        "resume": {
            "extracted_characters": len(resume_text),
            "extracted_words": len(resume_text.split())
        },

        "classification": {
            "predicted_category": predicted_category
        },

        "skills": {
            "total_skills": len(skills),
            "skills": skills
        },

        "quality_analysis": quality_result
    }

@app.post("/screen-resume")
async def screen_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    # --------------------------------------------------
    # Step 1: Validate PDF
    # --------------------------------------------------

    if file.content_type != "application/pdf":
        return {
            "status": "error",
            "message": "Only PDF files are supported."
        }

    # --------------------------------------------------
    # Step 2: Validate Job Description
    # --------------------------------------------------

    if not job_description.strip():
        return {
            "status": "error",
            "message": "Job description cannot be empty."
        }

    # --------------------------------------------------
    # Step 3: Save uploaded PDF
    # --------------------------------------------------

    upload_directory = BASE_DIR / "temp"
    upload_directory.mkdir(exist_ok=True)

    file_path = upload_directory / file.filename

    file_contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(file_contents)

    # --------------------------------------------------
    # Step 4: Extract resume text
    # --------------------------------------------------

    resume_text = extract_text_from_pdf(file_path)

    # --------------------------------------------------
    # Step 5: Build skill vocabulary
    # --------------------------------------------------

    skill_set = build_extraction_vocabulary(
        skills_df
    )

    # --------------------------------------------------
    # Step 6: Match Resume with Job Description
    # --------------------------------------------------
    generic_jd_skills = {
        "building",
        "models"
    }

    match_result = match_resume_to_jd(
        resume_text=resume_text,
        job_description=job_description,
        skill_set=skill_set,
        generic_jd_skills=generic_jd_skills
    )

    # --------------------------------------------------
    # Step 7: Return screening result
    # --------------------------------------------------

    return {
        "status": "success",
        "filename": file.filename,

        "resume": {
            "extracted_characters": len(resume_text),
            "extracted_words": len(resume_text.split())
        },

        "job_description": {
            "characters": len(job_description),
            "words": len(job_description.split())
        },

        "screening_result": {
            "total_resume_skills": match_result["total_resume_skills"],
            "total_jd_skills": match_result["total_jd_skills"],
            "matched_count": match_result["matched_count"],
            "missing_count": match_result["missing_count"],
            "additional_count": match_result["additional_count"],
            "skill_match_percentage": match_result["skill_match_percentage"],
            "matched_skills": match_result["matched_skills"],
            "missing_skills": match_result["missing_skills"],
            "additional_skills": match_result["additional_skills"]
        }
    }