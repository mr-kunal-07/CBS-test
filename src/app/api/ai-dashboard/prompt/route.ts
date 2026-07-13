import { NextRequest, NextResponse } from "next/server";
import { Agent, fetch as undiciFetch } from "undici";

const SMS_DASHBOARD_PROMPT_URL = "https://sms-app.appantech.com/api/dashboard/sms/prompt";

// The corporate network's Fortinet gateway TLS-inspects and re-signs this
// endpoint's certificate with its own CA, which isn't installed in this
// machine's trust store. Scoped to only this upstream call — global fetch
// and TLS verification elsewhere are untouched.
const insecureDispatcher = new Agent({
  connect: { rejectUnauthorized: false },
});

export async function POST(req: NextRequest) {
  let prompt: string;

  try {
    const body = await req.json();
    prompt = body?.prompt;
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ message: "prompt is required" }, { status: 400 });
  }

  try {
    const upstream = await undiciFetch(SMS_DASHBOARD_PROMPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      dispatcher: insecureDispatcher,
    });

    const data = (await upstream.json()) as { message?: string } | null;

    if (!upstream.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to generate dashboard" },
        { status: upstream.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("[ai-dashboard/prompt] upstream fetch failed:", err);
    return NextResponse.json(
      { message: "Unable to reach the SMS dashboard service" },
      { status: 502 }
    );
  }
}
