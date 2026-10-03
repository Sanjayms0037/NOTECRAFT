import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || !body.text || typeof body.text !== "string") {
      return NextResponse.json(
        { detail: "Please provide valid text for summarization." },
        { status: 400 }
      );
    }

    const pythonBackendUrl =
      process.env.PYTHON_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://127.0.0.1:8000";

    const backendEndpoint = `${pythonBackendUrl}/api/summarize`;

    try {
      const response = await fetch(backendEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (err: unknown) {
      console.error("Failed to connect to Python FastAPI backend:", err);
      return NextResponse.json(
        {
          detail:
            "Could not connect to the Python FastAPI backend service. Please ensure the backend is running at http://127.0.0.1:8000 or configure PYTHON_BACKEND_URL.",
          error_code: "BACKEND_UNREACHABLE",
        },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json(
      { detail: "Invalid request format. Expected JSON body with a 'text' property." },
      { status: 400 }
    );
  }
}
