"""Data models and internal state structures for Smart Study Notes Generator.
"""

from dataclasses import dataclass
from typing import List, Optional


@dataclass
class StudyNote:
    """Internal representation of a generated study note session."""
    original_text: str
    summary: str
    key_points: List[str]
    original_word_count: int
    summary_word_count: int
    reduction_percentage: float
    model_name: str
    latency_ms: float = 0.0


@dataclass
class ModelInfo:
    """Information regarding the configured Generative AI model."""
    name: str
    provider: str
    description: str
    is_loaded: bool = False
    context_window: int = 1024
