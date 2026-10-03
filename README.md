# NoteCraft

> **Turn what you read into what you remember.**  
> A lightweight, intelligent AI text summarization tool powered by Python, FastAPI, and Hugging Face Transformers.

[![Python Version](https://img.shields.io/badge/Python-3.12%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![Hugging Face](https://img.shields.io/badge/AI%20Model-facebook%2Fbart--large--cnn-yellow.svg)](https://huggingface.co/facebook/bart-large-cnn)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016%20%28React%2019%29-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Overview

**NoteCraft** transforms dense, long-form text into concise summaries and high-impact key ideas in seconds. Built for knowledge workers, researchers, engineers, and curious readers, NoteCraft eliminates cognitive fatigue by reducing complex articles, reports, and documentation into easily digestible insights with verifiable text reduction statistics.

The workflow is simple: **Paste → Generate → Understand**.

---

## Features

- **Concise Summaries:** Generates clean, cohesive narrative summaries that preserve the core thesis of your source text.
- **Key Ideas Extraction:** Automatically isolates 3–5 salient takeaways formatted for high-yield recall.
- **Verifiable Reduction Metrics:** Deterministic calculation of original word count, summary word count, and text reduction percentage handled directly in Python.
- **Modern Minimalist Interface:** Clean typography (Plus Jakarta Sans), high contrast, generous whitespace, and subtle CSS transitions without distracting clutter.
- **Dedicated Multi-Page Flow:**
  - `/` — Interactive landing page featuring an animated text condensation preview and core benefits.
  - `/summarize` — Focused summarization workspace with live word/character counters, sample text selectors, copy-to-clipboard, text-to-speech audio, and note export.
  - `/how-it-works` — 4-step consumer explanation of the AI pipeline with before/after comparisons.
  - `/about` — The NoteCraft philosophy: *"Less reading. More understanding."*
- **Accessibility & Motion First:** Built to respect `prefers-reduced-motion` with WCAG AA compliant contrast ratios and keyboard navigation.

---

## Getting Started

### Prerequisites

- **Python:** 3.12 or higher
- **Node.js:** 18.17 or higher
- **Package Manager:** `npm` or `pnpm`
- **Git**

---

## Local Development

NoteCraft is composed of a high-performance **Python FastAPI backend** and a modern **Next.js frontend**.

### 1. Clone the Repository

```bash
git clone https://github.com/Sanjayms0037/NOTECRAFT.git notecraft
cd notecraft
```


### 2. Backend Setup (Python + FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI development server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The FastAPI backend will be live at `http://127.0.0.1:8000` with interactive OpenAPI documentation available at `http://127.0.0.1:8000/docs`.

### 3. Frontend Setup (Next.js + TypeScript)

In a separate terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Environment Variables

### Backend Configuration (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
APP_NAME=NoteCraft API
APP_VERSION=2.0.0
DEBUG=True
PORT=8000
HOST=127.0.0.1
CORS_ORIGINS=["http://localhost:3000", "http://127.0.0.1:3000", "https://*.vercel.app"]
MAX_INPUT_WORDS=2000
MIN_INPUT_WORDS=5
DEFAULT_MODEL=facebook/bart-large-cnn
```

### Frontend Configuration (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

> **Security Note:** All AI provider credentials and model weights remain strictly on the backend server. No API tokens or secret keys are exposed to the client-side browser.

---

## AI Provider & Processing Pipeline

NoteCraft utilizes the `facebook/bart-large-cnn` sequence-to-sequence model via Hugging Face Transformers:

1. **Input Normalization:** Python sanitizes the incoming raw string, strips control characters, and validates minimum and maximum word counts.
2. **Context Encoding:** The bidirectional encoder represents the input text across contextual token embeddings.
3. **Abstractive Synthesis:** The autoregressive decoder generates a fluent abstractive summary without verbatim snippet cutting.
4. **Key Ideas Isolation:** Python algorithms isolate key thematic claims into ordered bullet points.
5. **Deterministic Reduction Engine:** Python computes:
   $$\text{Reduction \%} = \frac{\text{Original Words} - \text{Summary Words}}{\text{Original Words}} \times 100$$
   Values are rounded to one decimal place with zero-division safety.

---

## API Reference

### Health Check

```http
GET /health
```

#### Response
```json
{
  "status": "ok",
  "app": "NoteCraft",
  "version": "2.0.0"
}
```

### Summarize Text

```http
POST /api/summarize
Content-Type: application/json
```

#### Request Body
```json
{
  "text": "Artificial Intelligence is rapidly reshaping modern education by providing personalized learning pathways..."
}
```

#### Response Body
```json
{
  "summary": "Artificial Intelligence is rapidly reshaping modern education by providing personalized learning pathways...",
  "key_points": [
    "Artificial Intelligence provides personalized adaptive learning pathways.",
    "Generative AI tools assist educators in curriculum planning and predictive analytics.",
    "Institutions must develop robust digital literacy and ethical data governance."
  ],
  "original_word_count": 125,
  "summary_word_count": 55,
  "reduction_percentage": 56.0,
  "model": "facebook/bart-large-cnn"
}
```

---

## Testing

### Backend Unit Tests

Run the complete test suite verifying text sanitization, zero-division reduction math, Pydantic schemas, and FastAPI endpoints:

```bash
cd backend
pytest -v
```

### Frontend Typecheck & Linting

```bash
cd frontend
npm run lint
npm run build
```

Full evaluation benchmarks across real-world test cases (AI in Education, Climate Change, Computer Networks) are documented in [`docs/test-results.md`](docs/test-results.md).

---

## Deployment

### Vercel Deployment

NoteCraft is architected for frictionless deployment on Vercel:

1. Connect your GitHub repository to Vercel.
2. Vercel automatically detects the Next.js root.
3. Set the root directory to `frontend` or use the top-level `vercel.json` routing configuration.
4. Add environment variables in the Vercel Dashboard (`NEXT_PUBLIC_API_URL`).

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Author

Created with craft by **Sanjay** & the NoteCraft contributors.  
Feedback and pull requests are warmly welcomed!
