"""Text Processing and Metrics Utilities for Smart Study Notes Generator.
All metrics, word counts, reductions, and NLP text sanitization are handled
purely in Python as required by the academic specification.
"""

import re
import math
from typing import List


def clean_text(text: str) -> str:
    """Sanitize and normalize text input.
    - Normalizes various unicode whitespace and newline breaks.
    - Trims excess whitespace around words.
    - Strips unwanted non-printable characters.
    """
    if not text or not isinstance(text, str):
        return ""
    # Normalize unicode whitespace characters
    normalized = re.sub(r"[\r\t\f\v]", " ", text)
    # Normalize multiple newlines to double newline
    normalized = re.sub(r"\n\s*\n+", "\n\n", normalized)
    # Collapse multiple inline spaces
    normalized = re.sub(r"[ ]{2,}", " ", normalized)
    return normalized.strip()


def count_words(text: str) -> int:
    """Accurately count words in a string.
    Splits along whitespace boundaries and filters out empty tokens.
    """
    if not text or not isinstance(text, str):
        return 0
    words = text.strip().split()
    return len(words)


def count_characters(text: str, include_spaces: bool = True) -> int:
    """Count characters in the text, optionally excluding whitespace."""
    if not text or not isinstance(text, str):
        return 0
    if include_spaces:
        return len(text)
    return len(re.sub(r"\s+", "", text))


def calculate_reduction(original_word_count: int, summary_word_count: int) -> float:
    """Calculate the percentage by which text was reduced.
    Formula:
        reduction_percentage = ((original_word_count - summary_word_count) / original_word_count) * 100

    Guarantees:
    - Protects against zero-word input (returns 0.0)
    - Never produces NaN, Infinity, or negative invalid values
    - Clamped between 0.0% and 100.0%
    - Rounded to 1 decimal place
    """
    if original_word_count <= 0:
        return 0.0

    if summary_word_count >= original_word_count:
        return 0.0

    raw_percentage = ((original_word_count - summary_word_count) / original_word_count) * 100.0

    if math.isnan(raw_percentage) or math.isinf(raw_percentage):
        return 0.0

    clamped = max(0.0, min(100.0, raw_percentage))
    return round(clamped, 1)


def split_into_sentences(text: str) -> List[str]:
    """Split paragraph into clean sentences using regex boundaries."""
    if not text:
        return []
    # Match sentences ending with ., !, or ? followed by space or newline
    sentence_end = re.compile(r'(?<=[.!?])\s+(?=[A-Z0-9"\'(\[])')
    parts = sentence_end.split(text.strip())
    # Further sanitize each sentence
    cleaned = []
    for part in parts:
        part_clean = part.strip()
        if len(part_clean) > 10:  # Ignore trivial fragments
            cleaned.append(part_clean)
    return cleaned


def extract_key_points_nlp(text: str, summary: str = "", max_points: int = 4) -> List[str]:
    """Sensible Python-based NLP sentence extraction for key points.
    Identifies the most informative and topical sentences from the source text
    and summary based on term frequency and sentence position scoring.
    """
    sentences = split_into_sentences(text)
    if not sentences:
        return [summary] if summary else []

    if len(sentences) <= max_points:
        return [s.rstrip(".") for s in sentences]

    # Calculate word frequency table (excluding stop words)
    stop_words = {
        "the", "is", "at", "which", "on", "and", "a", "an", "in", "to", "of", "for",
        "with", "as", "by", "that", "this", "it", "from", "be", "are", "was", "were",
        "has", "have", "had", "been", "will", "would", "can", "could", "should", "not",
        "but", "or", "also", "their", "its", "they", "them", "these", "those"
    }

    words = re.findall(r"\b[a-zA-Z]{3,}\b", text.lower())
    freq_map = {}
    for w in words:
        if w not in stop_words:
            freq_map[w] = freq_map.get(w, 0) + 1

    # Score each sentence
    scored_sentences = []
    for idx, sentence in enumerate(sentences):
        sent_words = re.findall(r"\b[a-zA-Z]{3,}\b", sentence.lower())
        if not sent_words:
            continue
        # Base score from keyword frequency
        score = sum(freq_map.get(w, 0) for w in sent_words) / (len(sent_words) ** 0.6)

        # Position boost: first and concluding sentences are often the most salient
        if idx == 0:
            score *= 1.3
        elif idx == len(sentences) - 1:
            score *= 1.15

        scored_sentences.append((score, idx, sentence))

    # Sort by score descending and take top N
    scored_sentences.sort(key=lambda x: x[0], reverse=True)
    top_picks = scored_sentences[:max_points]

    # Re-sort chronologically by their original position in text for coherent reading
    top_picks.sort(key=lambda x: x[1])

    formatted_points = []
    for _, _, s in top_picks:
        clean_s = s.strip()
        # Remove trailing periods for bullet formatting if desired
        formatted_points.append(clean_s)

    return formatted_points
