import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Context Intelligence handles information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="legal-page shell">
        <p className="eyebrow">Website Notice</p>
        <h1>Privacy</h1>
        <p className="legal-page__updated">Last updated September 13, 2026</p>
        <section>
          <h2>Information you provide</h2>
          <p>When you submit an assessment request, strategy-session request, or Context Ready application, Context Intelligence receives the information you enter in that form. The information is used to review and respond to your request.</p>
        </section>
        <section>
          <h2>The readiness assessment</h2>
          <p>Your contact information is submitted when you begin the assessment. Your selections are evaluated in your browser to create the snapshot you see. When you complete the assessment, the seven scores and the resulting operating pattern, strongest system, and priority system are submitted with your contact information so Context Intelligence can respond in context.</p>
        </section>
        <section>
          <h2>Website operation</h2>
          <p>The services used to host and protect this website may process technical request information necessary to deliver the site, maintain security, and diagnose reliability problems.</p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p>Do not submit information you do not want Context Intelligence to receive. You may ask about information associated with a prior inquiry through the <Link href="/#contact">contact section</Link>.</p>
        </section>
        <p className="legal-page__note">This notice will be updated if the site begins using additional analytics, scheduling, or lead-management services.</p>
      </main>
      <Footer />
    </>
  );
}
