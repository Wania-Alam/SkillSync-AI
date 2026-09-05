# Raw Data

This folder contains the original datasets used by the **SkillSync AI** project.

The original CSV datasets are **not included in this GitHub repository** because of file size, dataset licensing, and data-distribution considerations.

## Dataset Overview

### 1. Resume Dataset

The primary resume dataset contains approximately **2,484 resumes** and is used for:

* Resume classification
* Natural Language Processing (NLP)
* Resume text analysis
* Skill extraction
* Resume-to-job-description matching
* Testing the SkillSync AI resume analysis pipeline

The dataset contains the following columns:

| Column        | Description                        |
| ------------- | ---------------------------------- |
| `ID`          | Unique identifier for the resume   |
| `Resume_str`  | Resume content in text format      |
| `Resume_html` | Resume content represented in HTML |
| `Category`    | Resume/job category                |

The dataset contains multiple professional categories, including Information Technology, HR, Healthcare, Engineering, Finance, Education, Sales, Design, and others.

**Expected file:**

```text
Resume.csv
```

---

## Skills Datasets

The `skills/` subfolder contains datasets used to construct the skill vocabulary for SkillSync AI.

Two skill-related datasets were used:

### 2. Data Skills Dataset

This dataset contains a broad collection of skill, technology, professional, and domain-related terms.

It was used as the primary source for creating the project's skill vocabulary.

**Expected file:**

```text
skills/Data Skills.csv
```

The original dataset contains approximately **38,589 entries**.

During preprocessing, duplicate and formatting-related entries were cleaned before producing the processed skill vocabulary.

### 3. Technology Skills Dataset

This dataset contains mappings between occupations and technologies/software.

It provides additional information about technologies associated with different occupations and can support future job recommendation and occupation analysis functionality.

**Expected file:**

```text
skills/Technology Skills.csv
```

The dataset contains approximately **27,858 rows** and includes fields such as:

* O*NET-SOC Code
* Title
* Example
* Commodity Code
* Commodity Title
* Hot Technology

---

## Dataset Availability

The original datasets are intentionally excluded from this repository.

To reproduce the project, obtain the datasets from their original sources and place them in the following structure:

```text
data/
└── raw/
    ├── Resume.csv
    └── skills/
        ├── Data Skills.csv
        └── Technology Skills.csv
```

Do not commit the original CSV datasets to GitHub unless their licenses explicitly permit redistribution.

---

## Data Pipeline

The raw datasets are processed before being used by the SkillSync AI system:

```text
Raw Resume Dataset
        ↓
Resume Cleaning
        ↓
Processed Resume Dataset

Raw Skills Dataset
        ↓
Cleaning + Deduplication
        ↓
Short-Skill Filtering
        ↓
Processed Skills Vocabulary
```

The processed outputs are documented in:

```text
data/processed/README.md
```
