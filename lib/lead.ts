export type Lead = {
  name: string;
  email: string;
  organization: string;
  interest?: "assessment" | "strategy";
};

export type LeadResult = { ok: true } | { ok: false; message: string };

export async function submitLead(lead: Lead): Promise<LeadResult> {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

  if (!endpoint) {
    return {
      ok: false,
      message: "Lead capture is ready for connection, but no submission destination is configured yet.",
    };
  }

  try {
    const response = await fetch(endpoint, {
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
