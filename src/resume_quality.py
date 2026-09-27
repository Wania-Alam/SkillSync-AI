import re


# --------------------------------------------------
# Resume section patterns
# --------------------------------------------------

section_heading_patterns = {
    "contact_information": [
        r"\bcontact\b",
        r"\bcontact information\b",
        r"\bpersonal information\b"
    ],

    "summary_objective": [
        r"\bsummary\b",
        r"\bprofessional summary\b",
        r"\bcareer objective\b",
        r"\bobjective\b",
        r"\bprofile\b",
        r"\bprofessional profile\b"
    ],

    "education": [
        r"\beducation\b",
        r"\bacademic background\b",
        r"\bacademic qualifications\b"
    ],

    "experience": [
        r"\bwork experience\b",
        r"\bprofessional experience\b",
        r"\bemployment history\b",
        r"\bwork history\b",
        r"\bexperience\b"
    ],

    "skills": [
        r"\bskills\b",
        r"\btechnical skills\b",
        r"\bprofessional skills\b",
        r"\bcore skills\b",
        r"\bkey skills\b",
        r"\bcompetencies\b"
    ],

    "projects": [
        r"\bprojects\b",
        r"\bproject experience\b",
        r"\bacademic projects\b"
    ],

    "certifications": [
        r"\bcertifications\b",
        r"\bcertification\b",
        r"\bprofessional certifications\b"
    ]
}


# --------------------------------------------------
# Core and optional sections
# --------------------------------------------------

core_sections = {
    "contact_information",
    "education",
    "experience",
    "skills"
}

optional_sections = {
    "summary_objective",
    "projects",
    "certifications"
}


# --------------------------------------------------
# Resume statistics
# --------------------------------------------------

def calculate_resume_statistics(text):
    text = str(text)

    character_count = len(text)
    word_count = len(text.split())
    sentence_count = len(
        re.findall(r"[.!?]+", text)
    )

    return {
        "character_count": character_count,
        "word_count": word_count,
        "sentence_count": sentence_count
    }


# --------------------------------------------------
# Section detection
# --------------------------------------------------

def detect_section_headings(text, section_patterns):
    text = str(text).lower()

    detected_sections = {}

    for section, patterns in section_patterns.items():

        detected = any(
            re.search(pattern, text)
            for pattern in patterns
        )

        detected_sections[section] = detected

    return detected_sections


# --------------------------------------------------
# Content length classification
# --------------------------------------------------

def classify_content_length(word_count):

    if word_count == 0:
        return "empty"

    elif word_count <= 200:
        return "very_short"

    else:
        return "sufficient"


# --------------------------------------------------
# Complete resume quality analysis
# --------------------------------------------------

def analyze_resume_quality(text):

    text = str(text)

    stats = calculate_resume_statistics(text)

    sections = detect_section_headings(
        text,
        section_heading_patterns
    )

    core_present = sum(
        sections[section]
        for section in core_sections
    )

    missing_core = [
        section
        for section in core_sections
        if not sections[section]
    ]

    content_status = classify_content_length(
        stats["word_count"]
    )

    indicators = []

    if content_status == "empty":

        indicators.append(
            "Resume contains no textual content."
        )

    elif content_status == "very_short":

        indicators.append(
            "Resume contains very limited textual content."
        )

    for section in missing_core:

        readable_name = (
            section.replace("_", " ").title()
        )

        indicators.append(
            f"Missing core section: {readable_name}."
        )

    if core_present == len(core_sections):

        indicators.append(
            "All core resume sections were detected."
        )

    return {
        "character_count": stats["character_count"],
        "word_count": stats["word_count"],
        "sentence_count": stats["sentence_count"],
        "detected_sections": sections,
        "core_sections_present": core_present,
        "missing_core_sections": sorted(missing_core),
        "content_length_status": content_status,
        "quality_indicators": indicators
    }


# --------------------------------------------------
# Final structured result
# --------------------------------------------------

def get_resume_quality_result(text):

    result = analyze_resume_quality(text)

    return {
        "word_count": result["word_count"],
        "sentence_count": result["sentence_count"],
        "character_count": result["character_count"],
        "content_status": result["content_length_status"],
        "detected_sections": result["detected_sections"],
        "core_sections_present": result["core_sections_present"],
        "missing_core_sections": result["missing_core_sections"],
        "quality_indicators": result["quality_indicators"]
    }