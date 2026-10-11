# Processed Data

This directory contains cleaned and prepared datasets used by **SkillSync AI**.

## Files

| File | Description |
|---|---|
| `resumes_clean.csv` | Cleaned resume text and associated category labels prepared from the raw resume dataset. Used during resume analysis and machine-learning workflow development. |
| `skills_clean.csv` | Cleaned skills vocabulary used by the skill-extraction pipeline. |
| `resume_skills.csv` | Resume-to-skill extraction output generated during preprocessing/analysis, where available. |

> The exact columns and row counts may vary depending on the preprocessing notebook version and the latest generated files. Refer to the notebooks in `notebooks/` for the transformation steps.

## How the files are produced

The processed files are created from the source datasets in `data/raw/` using the Jupyter notebooks in `notebooks/`. The notebooks document data cleaning, normalization, duplicate removal, filtering, and skill extraction.

## Important notes

- Do not edit generated CSV files manually unless you intend to make a deliberate data change.
- If you change preprocessing logic, rerun the relevant notebook and verify its output before using the updated data.
- These files may be large. Follow the repository's `.gitignore` and project-sharing policy when deciding which datasets to commit.
- Do not place credentials, personal information, or other sensitive data in this directory.

## Related folders

- `data/raw/` — source datasets and their documentation.
- `notebooks/` — preprocessing and analysis notebooks.
- `src/` — reusable Python modules used by the backend.
