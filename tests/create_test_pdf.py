from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


PROJECT_ROOT = Path(__file__).resolve().parent.parent

PDF_PATH = PROJECT_ROOT / "test_resume.pdf"


resume_text = [
    "John Smith",
    "Software Engineer",
    "",
    "Email: john.smith@example.com",
    "Phone: +1 555 123 4567",
    "",
    "SUMMARY",
    "Software Engineer with experience in Python, SQL, machine learning,",
    "data analysis, and backend application development.",
    "",
    "EDUCATION",
    "Bachelor of Science in Computer Science",
    "University of Technology",
    "",
    "EXPERIENCE",
    "Software Engineer - ABC Technologies",
    "Developed Python applications and worked with SQL databases.",
    "Built machine learning models and performed data analysis.",
    "",
    "SKILLS",
    "Python, SQL, Machine Learning, Pandas, NumPy, Git, Docker",
]


pdf = canvas.Canvas(
    str(PDF_PATH),
    pagesize=letter
)

width, height = letter

y_position = height - 50

for line in resume_text:

    pdf.drawString(
        50,
        y_position,
        line
    )

    y_position -= 18

    if y_position < 50:
        pdf.showPage()
        y_position = height - 50


pdf.save()

print("Test PDF created successfully.")
print("PDF path:", PDF_PATH)