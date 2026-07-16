import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid shell">
        <div className="footer__brand">
          <div className="footer__logo-crop">
            <Image src="/assets/logo-full.png" alt="Context Intelligence" width={300} height={110} unoptimized />
          </div>
          <p>Independent executive advisory for coordinated, measurable, and scalable organizational AI transformation.</p>
        </div>
        <FooterColumn title="Transformation" links={[["AI Transformation Blueprint™", "/#blueprint"], ["Business Context Engine™", "/#context-engine"], ["Readiness Assessment", "/#assessment"]]} />
        <FooterColumn title="Advisory" links={[["What We Deliver", "/#services"], ["Engagement Model", "/#engagement"], ["Business Independence", "/pathways/business-independence"]]} />
        <FooterColumn title="Firm" links={[["About", "/#about"], ["Contact", "/#contact"]]} />
      </div>
      <div className="footer__base shell">
        <span>© 2026 Context Intelligence</span>
        <span>Vision. Processes. Context. Workflows. Agents. Adoption. <b>Scale.</b></span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div className="footer__column">
      <h2>{title}</h2>
      {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
    </div>
  );
}
