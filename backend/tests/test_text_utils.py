"""Unit tests for Python text processing utilities and metric calculations."""

import pytest
from app.text_utils import (
    clean_text,
    count_words,
    count_characters,
    calculate_reduction,
    split_into_sentences,
    extract_key_points_nlp,
)


def test_clean_text_normalizes_whitespace():
    raw = "  This   is  a\n\n\nparagraph\twith\rweird   spacing.  "
    cleaned = clean_text(raw)
    assert "This is a" in cleaned
    assert "paragraph with weird spacing." in cleaned
    assert not cleaned.startswith(" ")
    assert not cleaned.endswith(" ")


def test_clean_text_empty_input():
    assert clean_text("") == ""
    assert clean_text(None) == ""


def test_count_words():
    assert count_words("Hello world this is a test") == 6
    assert count_words("   Leading and trailing   spaces  ") == 4
    assert count_words("") == 0
    assert count_words("     ") == 0


def test_count_characters():
    assert count_characters("abc def") == 7
    assert count_characters("abc def", include_spaces=False) == 6


def test_calculate_reduction_standard():
    # 150 words reduced to 50 words: (150 - 50) / 150 = 66.666...% -> 66.7%
    reduction = calculate_reduction(150, 50)
    assert reduction == 66.7


def test_calculate_reduction_zero_original():
    # Protect against zero division
    assert calculate_reduction(0, 0) == 0.0
    assert calculate_reduction(-10, 5) == 0.0


def test_calculate_reduction_summary_longer_than_original():
    # Never return negative invalid values
    assert calculate_reduction(50, 75) == 0.0


def test_calculate_reduction_identical_counts():
    assert calculate_reduction(100, 100) == 0.0


def test_split_into_sentences():
    text = "Machine learning is a subset of AI. It allows computers to learn from data! Does it replace humans? Not necessarily."
    sentences = split_into_sentences(text)
    assert len(sentences) == 4
    assert sentences[0] == "Machine learning is a subset of AI."


def test_extract_key_points_nlp():
    paragraph = (
        "Artificial Intelligence is revolutionizing higher education. "
        "Automated grading and tutoring systems provide immediate feedback to students. "
        "Furthermore, predictive analytics help institutions identify students at risk of falling behind. "
        "However, academic integrity and ethical data governance remain critical challenges."
    )
    points = extract_key_points_nlp(paragraph, max_points=3)
    assert isinstance(points, list)
    assert len(points) <= 3
    assert len(points) > 0
    assert any("Artificial Intelligence" in p for p in points)
