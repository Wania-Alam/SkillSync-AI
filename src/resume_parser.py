from pathlib import Path

from pypdf import PdfReader


def extract_text_from_pdf(file_path):
    """
    Extract text from a PDF resume.

    Parameters
    ----------
    file_path : str or Path
        Path to the PDF file.

    Returns
    -------
    str
        Extracted and cleaned resume text.
    """

    file_path = Path(file_path)

    reader = PdfReader(file_path)

    extracted_text = []

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            extracted_text.append(page_text)

    text = "\n".join(extracted_text)

    # Basic text cleanup
    text = " ".join(text.split())

    return text