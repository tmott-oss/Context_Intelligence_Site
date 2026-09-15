"use client";

import { useCallback, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadDialog } from "@/components/ui/LeadDialog";

const outcomes = [
  "Create a complete transformation, not disconnected tips.",
  "Build an owned revenue stream around your expertise.",
  "Give your audience a clear next step beyond free content.",
] as const;

const productFormats = [
  "Signature digital programs",
  "Guided learning experiences",
  "Playbooks and implementation systems",
  "Template and resource libraries",
  "AI-assisted tools and workflows",
  "Premium knowledge products",
] as const;

const process = [
  ["01", "Identify the opportunity", "We evaluate your expertise, audience, demand, and the outcome people are most likely to pay to achieve."],
  ["02", "Design the product", "We define the offer, structure the learning experience, organize the content, and establish the customer journey."],
  ["03", "Build and launch", "We develop the product assets, packaging, sales experience, delivery system, and launch plan."],
  ["04", "Learn and improve", "We use customer response, sales performance, and feedback to strengthen the product over time."],
] as const;

const partnership = [
  ["The creator brings", ["Subject-matter expertise", "Credibility and a trusted voice", "Access to the audience", "Participation in content development", "Authentic product promotion"]],
  ["Context Ready brings", ["Opportunity and offer strategy", "Product architecture", "Content organization and development", "Packaging and customer experience", "Launch and sales infrastructure", "Ongoing product optimization"]],
  ["Together", ["Approve the product direction", "Protect the creator’s voice and reputation", "Review performance", "Improve the offer over time", "Share in the product’s success"]],
] as const;

const idealPartners = [
  "Educators and skill-based creators",
  "Business and professional experts",
  "Coaches with a repeatable methodology",
  "Health, performance, or personal-development educators",
  "Creators whose audiences regularly ask for deeper instruction",
  "Subject-matter experts with demonstrated trust and engagement",
] as const;

export function ContextReadySite() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openApplication = useCallback(() => setDialogOpen(true), []);
  const closeApplication = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header onRequest={openApplication} requestLabel="Apply to Build Your Product" />
      <main id="main-content" className="context-ready">
        <section className="context-ready-hero" aria-labelledby="context-ready-title">
          <div className="shell context-ready-hero__layout">
            <div className="context-ready-hero__copy">
              <Eyebrow>Context Ready · The Creator Product Studio</Eyebrow>
              <h1 id="context-ready-title">Turn what you know into a product your audience will buy.</h1>
              <p>Your audience already comes to you for answers. Context Ready helps turn those answers into a complete, valuable digital product—built around your expertise, voice, and community.</p>
              <div className="actions">
                <Button onClick={openApplication}>Apply to Build Your Product</Button>
                <a className="button button--outline" href="#how-it-works">See How It Works</a>
              </div>
              <p className="context-ready-hero__endorsement">By Context Intelligence</p>
            </div>
            <div className="context-ready-hero__editorial" aria-label="From trusted expertise to a market-ready product">
              <p>Trusted expertise</p>
              <span aria-hidden="true">01</span>
              <p>Structured product</p>
              <span aria-hidden="true">02</span>
              <p>Market-ready experience</p>
              <small>The Creator Product Studio</small>
            </div>
          </div>
        </section>

        <section className="clarity-section context-ready-opportunity" aria-labelledby="opportunity-title">
          <div className="shell context-ready-split">
            <div className="clarity-heading">
              <Eyebrow>The Opportunity</Eyebrow>
              <h2 id="opportunity-title">Your knowledge is worth more than another short-form post.</h2>
            </div>
            <div>
              <p className="context-ready-lede">Individual videos can educate and attract attention, but they rarely give people a complete path to an outcome. A well-designed digital product organizes your expertise into a practical experience your audience can follow, apply, and purchase.</p>
              <ol className="context-ready-outcomes">
                {outcomes.map((outcome, index) => <li key={outcome}><span>{String(index + 1).padStart(2, "0")}</span>{outcome}</li>)}
              </ol>
            </div>
          </div>
        </section>

        <section className="clarity-section context-ready-build" aria-labelledby="build-title">
          <div className="shell">
            <div className="clarity-heading clarity-heading--split">
              <div>
                <Eyebrow>What We Build</Eyebrow>
                <h2 id="build-title">Products designed around the outcome your audience wants.</h2>
              </div>
              <p>The right product depends on your expertise, audience, and market opportunity. Each partnership selects the formats that best support the result—not a preset package.</p>
            </div>
            <ul className="context-ready-formats">
              {productFormats.map((format, index) => <li key={format}><span>{String(index + 1).padStart(2, "0")}</span><strong>{format}</strong></li>)}
            </ul>
          </div>
        </section>

        <section id="how-it-works" className="clarity-section context-ready-process anchor-section" aria-labelledby="process-title">
          <div className="shell">
            <div className="clarity-heading">
              <Eyebrow>How It Works</Eyebrow>
              <h2 id="process-title">A practical path from opportunity to improvement.</h2>
            </div>
            <div className="context-ready-process__grid">
              {process.map(([number, title, description]) => (
                <article key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="clarity-section context-ready-partnership" aria-labelledby="partnership-title">
          <div className="shell">
            <div className="clarity-heading clarity-heading--center">
              <Eyebrow centered>The Partnership</Eyebrow>
              <h2 id="partnership-title">A partnership built around shared success.</h2>
            </div>
            <div className="context-ready-partnership__grid">
              {partnership.map(([title, items], index) => (
                <article key={title} className={index === 2 ? "is-together" : undefined}>
                  <p>{String(index + 1).padStart(2, "0")}</p>
                  <h3>{title}</h3>
                  <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
            <p className="context-ready-commercial">For selected partnerships, Context Ready may invest in product development in exchange for an agreed share of product revenue. Partnership structure, responsibilities, ownership, expenses, and revenue participation are defined before work begins.</p>
          </div>
        </section>

        <section className="clarity-section context-ready-fit" aria-labelledby="fit-title">
          <div className="shell context-ready-split">
            <div className="clarity-heading">
              <Eyebrow>Who It Is For</Eyebrow>
              <h2 id="fit-title">Built for experts with something proven to teach.</h2>
              <p className="context-ready-qualification">We are best suited to creators who have credible expertise, an identifiable audience need, and the willingness to actively support the product’s launch.</p>
            </div>
            <ul className="context-ready-fit__list">
              {idealPartners.map((partner, index) => <li key={partner}><span>{String(index + 1).padStart(2, "0")}</span>{partner}</li>)}
            </ul>
          </div>
        </section>

        <section className="clarity-section context-ready-cta" aria-labelledby="context-ready-cta-title">
          <div className="shell context-ready-cta__inner">
            <Eyebrow centered>Build What Comes Next</Eyebrow>
            <h2 id="context-ready-cta-title">Your audience is already listening. Give them the complete path.</h2>
            <p>If you have proven expertise and an engaged audience, let’s explore whether it can become a valuable digital product.</p>
            <div className="actions actions--center">
              <Button onClick={openApplication}>Apply to Build Your Product</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LeadDialog key={`context-ready-${dialogOpen}`} open={dialogOpen} intent="context-ready" onClose={closeApplication} />
    </>
  );
}
