from pathlib import Path

import joblib
import re


# --------------------------------------------------
# Project paths
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_FILE = (
    BASE_DIR
    / "models"
    / "resume_classifier.pkl"
)

VECTORIZER_FILE = (
    BASE_DIR
    / "models"
    / "tfidf_vectorizer.pkl"
)


# --------------------------------------------------
# Load trained model and TF-IDF vectorizer
# --------------------------------------------------

model = joblib.load(MODEL_FILE)

tfidf = joblib.load(VECTORIZER_FILE)


# --------------------------------------------------
# Resume text cleaning
# --------------------------------------------------

def clean_resume_text(text):

    text = str(text)

    text = text.lower()

    text = re.sub(
        r"http\S+|www\S+",
        " ",
        text
    )

    text = re.sub(
        r"\S+@\S+",
        " ",
        text
    )

    text = re.sub(
        r"<[^>]+>",
        " ",
        text
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    text = text.strip()

    return text


# --------------------------------------------------
# Resume category prediction
# --------------------------------------------------

def predict_resume_category(resume_text):

    cleaned_text = clean_resume_text(
        resume_text
    )

    resume_features = tfidf.transform(
        [cleaned_text]
    )

    prediction = model.predict(
        resume_features
    )[0]

    return prediction