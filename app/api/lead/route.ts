import { NextResponse } from "next/server";

const allowedInterests = new Set(["assessment", "strategy", "context-ready"]);
const allowedStatuses = new Set(["started", "completed"]);
const hubspotPortalIdPattern = /^\d+$/;
const hubspotFormIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function text(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : undefined;
}

function assessmentMessage(lead: Record<string, unknown>) {
  const status = lead.assessmentStatus === "completed" ? "Completed" : "Started";
  const lines = [
    "AI Transformation Readiness Assessment",
    `Status: ${status}`,
    lead.assessmentPattern ? `Operating pattern: ${lead.assessmentPattern}` : undefined,
    lead.assessmentStrength ? `Strongest system: ${lead.assessmentStrength}` : undefined,
    lead.assessmentPriority ? `Priority system: ${lead.assessmentPriority}` : undefined,
  ];

  const scores = lead.assessmentScores as Record<string, number> | undefined;
  if (scores && Object.keys(scores).length) {
    lines.push(
      "Seven-system scores (1-4):",
      ...Object.entries(scores).map(([system, score]) => `${system.replaceAll("-", " ")}: ${score}`),
    );
  }

  return lines.filter(Boolean).join("\n");
}

function strategyMessage() {
  return [
    "Executive Strategy Session Request",
    "Source: Context Intelligence website",
  ].join("\n");
}

async function submitToHubSpot({
  formId,
  fields,
  pageName,
  pagePath,
  unavailableMessage,
  failureMessage,
}: {
  formId: string | undefined;
  fields: Array<[string, unknown]>;
  pageName: string;
  pagePath: string;
  unavailableMessage: string;
  failureMessage: string;
}) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  if (!portalId || !formId || !hubspotPortalIdPattern.test(portalId) || !hubspotFormIdPattern.test(formId)) {
    return NextResponse.json({ message: unavailableMessage }, { status: 503 });
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  const hubspotFields = fields.map(([name, value]) => ({ objectTypeId: "0-1", name, value }));

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: hubspotFields,
        submittedAt: String(Date.now()),
        context: {
          pageName,
          pageUri: `${process.env.NEXT_PUBLIC_SITE_URL || "https://contextintelligence.io"}${pagePath}`,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error("HubSpot rejected the form submission.");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: failureMessage }, { status: 502 });
  }
}

async function submitAssessmentToHubSpot(lead: Record<string, unknown>) {
  return submitToHubSpot({
    formId: process.env.HUBSPOT_ASSESSMENT_FORM_ID,
    fields: [
      ["firstname", lead.firstName],
      ["lastname", lead.lastName],
      ["email", lead.email],
      ["company", lead.organization],
      ["jobtitle", lead.title],
      ["phone", lead.phone],
      ["message", assessmentMessage(lead)],
    ],
    pageName: lead.assessmentStatus === "completed"
      ? "AI Transformation Readiness Assessment — Completed"
      : "AI Transformation Readiness Assessment — Started",
    pagePath: "/assessment",
    unavailableMessage: "Assessment delivery is not configured.",
    failureMessage: "The assessment could not be delivered.",
  });
}

async function submitStrategyToHubSpot(lead: Record<string, unknown>) {
  return submitToHubSpot({
    formId: process.env.HUBSPOT_STRATEGY_FORM_ID,
    fields: [
      ["firstname", lead.firstName],
      ["lastname", lead.lastName],
      ["email", lead.email],
      ["company", lead.organization],
      ["message", strategyMessage()],
    ],
    pageName: "Executive Strategy Session Request",
    pagePath: "/#contact",
    unavailableMessage: "Strategy session delivery is not configured.",
    failureMessage: "The strategy session request could not be delivered.",
  });
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    input = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = text(input.name, 160);
  const firstName = text(input.firstName, 80);
  const lastName = text(input.lastName, 80);
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
    firstName,
    lastName,
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

  if (interest === "assessment") {
    if (!firstName || !lastName || !lead.organization || !lead.title || !lead.phone) {
      return NextResponse.json({ message: "Required assessment contact information is missing." }, { status: 400 });
    }
    return submitAssessmentToHubSpot(lead);
  }

  if (interest === "strategy") {
    if (!firstName || !lastName || !lead.organization) {
      return NextResponse.json({ message: "Required strategy session contact information is missing." }, { status: 400 });
    }
    return submitStrategyToHubSpot(lead);
  }

  const endpoint = process.env.LEAD_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ message: "Lead delivery is not configured." }, { status: 503 });
  }

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
