# Skills Datasets

This folder contains the original skill-related datasets used during development of **SkillSync AI**.

The original CSV files are not included in the GitHub repository.

## Data Skills

**File:**

```text
Data Skills.csv
```

Purpose:

The Data Skills dataset provides a broad vocabulary of skills, technologies, professional terms, and domain-specific terms.

Original dataset size:

```text
38,589 entries
```

The dataset was cleaned by:

1. Normalizing text to lowercase
2. Removing unnecessary whitespace and line breaks
3. Removing duplicate entries
4. Inspecting short skill terms
5. Removing obvious numeric/noisy entries where appropriate

The processed vocabulary is stored separately in:

```text
data/processed/skills_clean.csv
```

## Technology Skills

**File:**

```text
Technology Skills.csv
```

Purpose:

The Technology Skills dataset provides occupation-to-technology relationships and contains information about technologies/software associated with different occupations.

Original dataset size:

```text
27,858 rows
```

Important columns include:

```text
O*NET-SOC Code
Title
Example
Commodity Code
Commodity Title
Hot Technology
```

This dataset is intended to support future functionality such as occupation analysis and job recommendations.

## Expected Folder Structure

```text
skills/
├── README.md
├── Data Skills.csv
└── Technology Skills.csv
```

The CSV files should remain local and should not be committed to GitHub.

## Important Note

The skill vocabulary is not treated as a perfect list of valid skills. It contains a mixture of technical, professional, domain-specific, and potentially ambiguous terms.

Therefore, SkillSync AI applies additional preprocessing and validation before using the vocabulary for skill extraction.
