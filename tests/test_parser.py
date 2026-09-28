import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent

sys.path.insert(
    0,
    str(PROJECT_ROOT)
)


from src.resume_parser import extract_text_from_pdf


pdf_path = PROJECT_ROOT / "test_resume.pdf"


resume_text = extract_text_from_pdf(
    pdf_path
)


print(
    "Extracted characters:",
    len(resume_text)
)

print(
    "Extracted words:",
    len(resume_text.split())
)

print("\nExtracted Resume Text:")
print("=" * 70)

print(
    resume_text[:3000]
)