import { NextResponse } from "next/server";

export async function GET() {
  const pythonBackendUrl =
    process.env.PYTHON_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000";

  try {
    const res = await fetch(`${pythonBackendUrl}/health`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        status: "ok",
        frontend: "Next.js App Router (TypeScript)",
        backend: data,
      });
    }
  } catch {
    // If backend is currently sleeping or down
  }

  return NextResponse.json({
    status: "ok",
    frontend: "Next.js App Router (TypeScript)",
    backend_status: "Backend not reachable at " + pythonBackendUrl,
  });
}
