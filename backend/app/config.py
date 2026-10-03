"""Configuration settings for NoteCraft Backend.
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
DEFAULT_MODEL = os.getenv("HF_MODEL", "facebook/bart-large-cnn")

# Summarization hyper-parameters
MAX_SUMMARY_LENGTH = int(os.getenv("MAX_SUMMARY_LENGTH", "150"))
MIN_SUMMARY_LENGTH = int(os.getenv("MIN_SUMMARY_LENGTH", "30"))

# Service Metadata
APP_NAME = "NoteCraft API"
APP_VERSION = "2.0.0"
APP_DESCRIPTION = (
    "Turn what you read into what you remember. "
    "Lightweight AI-powered text summarization and key point extraction engine."
)
