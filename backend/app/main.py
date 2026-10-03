"""FastAPI Application Entry Point for Smart Study Notes Generator.
Exposes:
- GET /health
- POST /api/summarize
Provides full CORS configuration, structured validation, and friendly error handling.
"""

import sys
import logging
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import APP_NAME, APP_VERSION, APP_DESCRIPTION, DEFAULT_MODEL
from app.schemas import SummarizeRequest, SummarizeResponse, HealthResponse
from app.summarizer import run_summarization

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("notecraft-api")

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description=APP_DESCRIPTION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for Next.js frontend (local development and production Vercel domains)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits local Next.js (port 3000) and deployed Vercel domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    """Verify backend status and active Python runtime."""
    return HealthResponse(
        status="ok",
        app=APP_NAME,
        version=APP_VERSION,
        model=DEFAULT_MODEL,
        python_engine=f"Python {sys.version.split()[0]}"
    )


@app.get("/", tags=["Root"])
def root():
    """Welcome endpoint providing quick API overview."""
    return {
        "message": "Welcome to NoteCraft API",
        "health": "/health",
        "docs": "/docs",
        "summarize_endpoint": "/api/summarize"
    }


@app.post(
    "/api/summarize",
    response_model=SummarizeResponse,
    status_code=status.HTTP_200_OK,
    tags=["Summarization"]
)
async def summarize_study_notes(payload: SummarizeRequest):
    """Generate concise study summary, actionable key points, and text reduction metrics.

    Validates request payload, triggers Hugging Face summarization engine,
    and returns verified metrics computed in Python.
    """
    try:
        logger.info(f"Received summarization request with {len(payload.text.split())} words.")
        result = run_summarization(
            raw_text=payload.text,
            max_length=payload.max_length,
            min_length=payload.min_length,
            model_name=DEFAULT_MODEL
        )
        return SummarizeResponse(**result)

    except ValueError as val_err:
        logger.warning(f"Validation error in summarization: {val_err}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(val_err)
        )
    except Exception as exc:
        logger.error(f"Unexpected error during note generation: {exc}", exc_info=False)
        # Never expose raw stack traces to the client
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "detail": "We couldn't generate your notes right now. Please try again or check your input.",
                "error_code": "GENERATION_FAILED"
            }
        )
