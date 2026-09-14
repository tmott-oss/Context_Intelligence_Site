import { NextResponse } from "next/server";

const allowedInterests = new Set(["assessment", "strategy", "context-ready"]);
const allowedStatuses = new Set(["started", "completed"]);

function text(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : undefined;
}

export async function POST(request: Request) {
  const endpoint = process.env.LEAD_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ message: "Lead delivery is not configured." }, { status: 503 });
  }

  let input: Record<string, unknown>;
  try {
    input = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = text(input.name, 160);
  const email = text(input.email, 320);
  const interest = text(input.interest, 40);
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !interest || !allowedInterests.has(interest)) {
    return NextResponse.json({ message: "Required contact information is missing or invalid." }, { status: 400 });
  }

  const assessmentStatus = text(input.assessmentStatus, 20);
  const scores = input.assessmentScores && typeof input.assessmentScores === "object"
    ? Object.fromEntries(
        Object.entries(input.assessmentScores as Record<string, unknown>)
          .filter(([, value]) => typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 4)
          .slice(0, 7),
      )
    : undefined;

  const lead = {
    name,
    email,
    interest,
    organization: text(input.organization, 200),
    title: text(input.title, 160),
    phone: text(input.phone, 80),
    platform: text(input.platform, 160),
    profileUrl: text(input.profileUrl, 600),
    expertise: text(input.expertise, 1000),
    audienceSize: text(input.audienceSize, 160),
    productIdea: text(input.productIdea),
    audienceQuestions: text(input.audienceQuestions),
    promotionWillingness: text(input.promotionWillingness, 80),
    additionalInfo: text(input.additionalInfo),
    assessmentId: text(input.assessmentId, 160),
    assessmentStatus: assessmentStatus && allowedStatuses.has(assessmentStatus) ? assessmentStatus : undefined,
    assessmentPattern: text(input.assessmentPattern, 160),
    assessmentPriority: text(input.assessmentPriority, 200),
    assessmentStrength: text(input.assessmentStrength, 200),
    assessmentScores: scores,
    submittedAt: new Date().toISOString(),
    source: "context-intelligence-site",
  };

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.LEAD_ENDPOINT_BEARER_TOKEN) {
    headers.Authorization = `Bearer ${process.env.LEAD_ENDPOINT_BEARER_TOKEN}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error("Lead destination rejected the request.");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "The request could not be delivered." }, { status: 502 });
  }
}
