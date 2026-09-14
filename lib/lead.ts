export type Lead = {
  name: string;
  email: string;
  organization?: string;
  title?: string;
  phone?: string;
  assessmentId?: string;
  assessmentStatus?: "started" | "completed";
  assessmentPattern?: string;
  assessmentPriority?: string;
  assessmentStrength?: string;
  assessmentScores?: Record<string, number>;
  interest?: "assessment" | "strategy" | "context-ready";
  platform?: string;
  profileUrl?: string;
  expertise?: string;
  audienceSize?: string;
  productIdea?: string;
  audienceQuestions?: string;
  promotionWillingness?: string;
  additionalInfo?: string;
};

export type LeadResult = { ok: true } | { ok: false; message: string };

export async function submitLead(lead: Lead): Promise<LeadResult> {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) throw new Error("Submission failed");
    return { ok: true };
  } catch {
    return { ok: false, message: "We could not submit your request. Please try again shortly." };
  }
}
