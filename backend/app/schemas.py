"""Pydantic schemas for request validation and response formatting.
Ensures rigorous type-checking, data validation, and clear error responses.
"""

from typing import List, Optional
from pydantic import BaseModel, Field, field_validator


class SummarizeRequest(BaseModel):
    """Input payload for text summarization."""
    text: str = Field(
        ...,
        description="Paragraph of study material provided by user to summarize.",
        min_length=15,
        max_length=15000,
        examples=[
            "Artificial Intelligence is transforming higher education by enabling personalized learning paths, automated feedback systems, and adaptive testing mechanisms."
        ]
    )
    max_length: Optional[int] = Field(
        None,
        ge=20,
        le=300,
        description="Optional maximum token/word length of the summary."
    )
    min_length: Optional[int] = Field(
        None,
        ge=10,
        le=150,
        description="Optional minimum token/word length of the summary."
    )

    @field_validator("text")
    @classmethod
    def validate_non_empty(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("Text cannot be empty or purely whitespace.")
        # Ensure at least 5 words to make meaningful summarization
        words = stripped.split()
        if len(words) < 5:
            raise ValueError("Input text must contain at least 5 words for summarization.")
        return stripped


class SummarizeResponse(BaseModel):
    """Structured response payload returned by the Python FastAPI engine."""
    summary: str = Field(..., description="Generative summary created by AI model.")
    key_points: List[str] = Field(..., description="Extracted actionable study key points.")
    original_word_count: int = Field(..., description="Word count of the input study material.")
    summary_word_count: int = Field(..., description="Word count of the generated summary.")
    reduction_percentage: float = Field(..., description="Percentage by which original text was condensed.")
    model: str = Field(..., description="Hugging Face AI model name used for inference.")
    processing_time_ms: Optional[float] = Field(None, description="Time taken for Python processing in milliseconds.")


class HealthResponse(BaseModel):
    """Health check endpoint response."""
    status: str = Field("ok", description="Service health indicator.")
    app: str = Field("Smart Study Notes Generator", description="Application identifier.")
    version: str = Field("1.0.0", description="API version.")
    model: str = Field(..., description="Active AI model configured.")
    python_engine: str = Field(..., description="Python runtime version.")
