import re


# Canonical aliases used throughout SkillSync AI.
skill_aliases = {
    "react": "react.js",
    "reactjs": "react.js",
    "react js": "react.js",
    "vuejs": "vue",
    "vue js": "vue",
    "angularjs": "angular",
    "angular js": "angular",
    "nodejs": "node.js",
    "node js": "node.js",
    "scikit learn": "scikit-learn",
    "scikit learn library": "scikit-learn",
    "tensorflow library": "tensorflow",
    "pytorch library": "pytorch",
    "ml": "machine learning",
    "ai": "artificial intelligence",
    "data analytics": "data analysis",
    "mongo": "mongodb",
    "mongo db": "mongodb",
    "postgre sql": "postgresql",
    "c sharp": "c#",
    "cpp": "c++",
    "amazon web services": "aws",
    "microsoft azure": "azure",
    "google cloud platform": "gcp",
    "git hub": "github",
    "powerbi": "power bi",

    # Professional/domain variants.
    "administrative": "administration",
    "admin": "administration",
    "hr administration": "human resources",
    "human resource": "human resources",
}

# Common wording variations used in resumes and Job Descriptions
skill_aliases.update({
    "financial reports": "financial reporting",
    "financial report": "financial reporting",

    "modeling": "financial modeling",
    "financial model": "financial modeling",
    "financial models": "financial modeling",

    "variances": "variance analysis",
    "variance": "variance analysis",

    "microsoft excel": "excel",

    "account payable": "accounts payable",
    "account receivable": "accounts receivable",

    "general ledger accounting": "general ledger",
})

skill_aliases.update({
    "financial reports": "financial reporting",
    "financial report": "financial reporting",

    "microsoft excel": "excel",

    "account payable": "accounts payable",
    "account receivable": "accounts receivable",

    "general ledger accounting": "general ledger",
})

# These are legitimate professional/domain skills that should not be
# removed simply because they look like common English words.
supplemental_professional_skills = {
    "administration",
    "administrative",
    "benefits administration",
    "communication",
    "customer service",
    "employee relations",
    "human resources",
    "performance management",
    "recruitment",
    "training and development",
    "conflict resolution",
    "compensation",
    "labor relations",
    "payroll",
    "pension",
    "time management",
    "leadership",
    "documentation",
    "healthcare",
}


def normalize_text_aliases(text, aliases=None):
    """Normalize known spelling/format variants in one pass."""
    if aliases is None:
        aliases = skill_aliases

    text = str(text).lower()
    aliases_sorted = sorted(aliases.keys(), key=len, reverse=True)

    if not aliases_sorted:
        return text

    pattern = re.compile(
        r"(?<![a-z0-9])("
        + "|".join(re.escape(a) for a in aliases_sorted)
        + r")(?![a-z0-9])"
    )

    return pattern.sub(lambda m: aliases[m.group(0)], text)


def normalize_skill(skill):
    skill = str(skill).lower().strip()
    return skill_aliases.get(skill, skill)


def extract_skills(text, skill_set, max_words=5):
    """
    Extract exact vocabulary matches using longest phrases first.

    skill_set may be the cleaned dataset vocabulary plus the
    supplemental professional vocabulary.
    """
    text = str(text).lower()
    text = re.sub(r"[^a-z0-9+#.\- ]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    words = [w.strip(".") for w in text.split() if w.strip(".")]
    found_skills = set()

    for n in range(max_words, 0, -1):
        for i in range(len(words) - n + 1):
            phrase = " ".join(words[i:i+n])
            if phrase in skill_set:
                found_skills.add(phrase)

    return sorted(found_skills)


def remove_overlapping_skills(skills):
    """Keep longer phrases when a shorter skill is contained in them."""
    skills = sorted(
        set(skills),
        key=lambda x: (-len(x.split()), -len(x), x)
    )

    final_skills = []

    for skill in skills:
        skill_words = skill.split()
        is_subskill = False

        for existing_skill in final_skills:
            existing_words = existing_skill.split()
            n = len(skill_words)

            for i in range(len(existing_words) - n + 1):
                if existing_words[i:i+n] == skill_words:
                    is_subskill = True
                    break

            if is_subskill:
                break

        if not is_subskill:
            final_skills.append(skill)

    return sorted(final_skills)


def build_extraction_vocabulary(
    skills_df,
    generic_words=None,
    protected_skills=None,
):
    """
    Build the extraction vocabulary.

    The important correction is that legitimate professional skills
    such as communication and customer service are explicitly retained.
    """
    generic_words = set(generic_words or set())
    protected_skills = set(protected_skills or set())

    vocabulary = set(
        skills_df["clean_skill"]
        .dropna()
        .astype(str)
        .str.lower()
        .str.strip()
    )

    # Remove numeric-only entries.
    vocabulary = {
        skill for skill in vocabulary
        if not re.fullmatch(r"\d+", skill)
    }

    # Remove generic one-word noise, but preserve protected and
    # supplemental professional skills.
    vocabulary = {
        skill for skill in vocabulary
        if (
            len(skill.split()) > 1
            or skill in protected_skills
            or skill in supplemental_professional_skills
            or skill not in generic_words
        )
    }

    # Always retain legitimate professional/domain terms.
    vocabulary.update(supplemental_professional_skills)

    return vocabulary


def extract_and_classify_skills(
    text,
    skill_set,
    max_words=5,
):
    """
    Return the final normalized skill list.

    This function intentionally returns a list so it remains compatible
    with Phase 6 matching.
    """
    normalized_text = normalize_text_aliases(text)

    extracted = extract_skills(
        normalized_text,
        skill_set,
        max_words=max_words,
    )

    normalized = {
        normalize_skill(skill)
        for skill in extracted
    }

    return remove_overlapping_skills(normalized)


def match_resume_to_jd(
    resume_text,
    job_description,
    skill_set,
    generic_jd_skills=None,
):
    """
    Compare resume skills with JD skills.

    The percentage is based on the number of validated JD skills.
    This is a skill-overlap measure, not a hiring decision.
    """
    resume_skills = extract_and_classify_skills(
        resume_text,
        skill_set,
    )

    jd_skills = extract_and_classify_skills(
        job_description,
        skill_set,
    )

    generic_jd_skills = set(generic_jd_skills or set())

    jd_skills_clean = [
        skill for skill in jd_skills
        if skill not in generic_jd_skills
    ]

    resume_skill_set = set(resume_skills)
    jd_skill_set = set(jd_skills_clean)

    matched_skills = resume_skill_set & jd_skill_set
    missing_skills = jd_skill_set - resume_skill_set
    additional_skills = resume_skill_set - jd_skill_set

    percentage = (
        len(matched_skills) / len(jd_skill_set) * 100
        if jd_skill_set else 0.0
    )

    return {
        "total_resume_skills": len(resume_skill_set),
        "total_jd_skills": len(jd_skill_set),
        "matched_count": len(matched_skills),
        "missing_count": len(missing_skills),
        "additional_count": len(additional_skills),
        "skill_match_percentage": round(percentage, 2),
        "resume_skills": sorted(resume_skill_set),
        "jd_skills": sorted(jd_skill_set),
        "matched_skills": sorted(matched_skills),
        "missing_skills": sorted(missing_skills),
        "additional_skills": sorted(additional_skills),
    }
