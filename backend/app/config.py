"""Configuration settings for Smart Study Notes Generator Backend.
Loads environment variables such as HF_TOKEN and specifies model configurations.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from backend or root directory if present
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
load_dotenv(BASE_DIR.parent / ".env")

# Hugging Face Configuration
HF_TOKEN = os.getenv("HF_TOKEN", "")
# Default model: facebook/bart-large-cnn is the gold standard for summarization,
# sshleifer/distilbart-cnn-12-6 is lightweight and fast.
DEFAULT_MODEL = os.getenv("HF_MODEL", "facebook/bart-large-cnn")

# Summarization hyper-parameters
MAX_SUMMARY_LENGTH = int(os.getenv("MAX_SUMMARY_LENGTH", "150"))
MIN_SUMMARY_LENGTH = int(os.getenv("MIN_SUMMARY_LENGTH", "30"))

# Service Metadata
APP_NAME = "Smart Study Notes Generator API"
APP_VERSION = "1.0.0"
APP_DESCRIPTION = (
    "Generative AI Based Text Summarization and Smart Note Extraction using Python, "
    "FastAPI, and Hugging Face Transformers."
)
