export interface SummarizeResponse {
  summary: string;
  key_points: string[];
  original_word_count: number;
  summary_word_count: number;
  reduction_percentage: number;
  model: string;
  processing_time_ms?: number;
}

export interface ApiError {
  message: string;
  code?: string;
}

export async function summarizeText(text: string): Promise<SummarizeResponse> {
  const cleanInput = text.trim();
  if (!cleanInput) {
    throw new Error("Please enter or paste study material before generating notes.");
  }

  const wordCount = cleanInput.split(/\s+/).filter(Boolean).length;
  if (wordCount < 5) {
    throw new Error("Input text is too short. Please provide at least 5 words for a meaningful summary.");
  }

  // Determine endpoint: prefer local/configured backend or proxy
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const endpoint = backendBase ? `${backendBase}/api/summarize` : "/api/summarize";

  let response: Response;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for heavy AI generation

    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: cleanInput }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("The AI model took too long to respond. Please try a shorter paragraph or try again.");
    }
    // Network / connection error
    throw new Error("Unable to connect to the Python AI backend. Please verify the backend server is running.");
  }

  if (!response.ok) {
    let errorDetail = "We couldn't generate your notes right now. Please try again.";
    try {
      const errorJson = await response.json();
      if (errorJson.detail) {
        if (typeof errorJson.detail === "string") {
          errorDetail = errorJson.detail;
        } else if (Array.isArray(errorJson.detail) && errorJson.detail[0]?.msg) {
          errorDetail = errorJson.detail[0].msg;
        }
      }
    } catch {
      // Fallback to default message
    }
    throw new Error(errorDetail);
  }

  const data: SummarizeResponse = await response.json();
  return data;
}

export async function checkBackendHealth(): Promise<{ status: string; model?: string; python_engine?: string } | null> {
  try {
    const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
    const endpoint = backendBase ? `${backendBase}/health` : "/health";
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Health check quiet fail
  }
  return null;
}
