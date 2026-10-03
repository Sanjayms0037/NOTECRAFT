"""Vercel Serverless Function entry point.
Exposes the FastAPI application to Vercel's Python runtime.
"""

import sys
from pathlib import Path

# Add root and backend to sys.path
root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir / "backend"))

from app.main import app
