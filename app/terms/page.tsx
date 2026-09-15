import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Terms governing use of the Context Intelligence website.",
};

export default function TermsPage() {
  return (
    <>
      <main className="legal-page shell">
        <p className="eyebrow">Website Notice</p>
        <h1>Website Terms</h1>
        <p className="legal-page__updated">Last updated September 13, 2026</p>
        <section>
          <h2>Informational purpose</h2>
          <p>This website presents general information about Context Intelligence, its frameworks, and potential advisory services. Website content and assessment results are not a substitute for an engagement tailored to your organization.</p>
        </section>
        <section>
          <h2>No engagement created</h2>
          <p>Using the website, completing the readiness assessment, or submitting an inquiry does not create an advisory, partnership, employment, or other professional relationship. Any engagement is defined separately in a written agreement.</p>
        </section>
        <section>
          <h2>Assessment limits</h2>
          <p>The AI Transformation Readiness Assessment is a directional planning tool. It is not an audit, certification, universal benchmark, or guarantee of business, financial, operational, or technology outcomes.</p>
        </section>
        <section>
          <h2>Use of the site</h2>
          <p>You may use the site for lawful evaluation of Context Intelligence and its services. Do not interfere with the site, attempt unauthorized access, or submit information you are not authorized to provide.</p>
        </section>
        <p className="legal-page__note">Questions about these website terms may be submitted through the <Link href="/#contact">contact section</Link>.</p>
      </main>
      <Footer />
    </>
  );
}
