import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid shell">
        <div className="footer__brand">
          <div className="footer__logo-crop">
            <Image src="/assets/logo-full.png" alt="Context Intelligence" width={300} height={110} unoptimized />
          </div>
          <p>Independent executive advisory for organizational AI transformation.</p>
        </div>
        <FooterColumn title="Transformation" links={[["AI Readiness Assessment", "/assessment"], ["Why It Matters", "/#why-it-matters"], ["AI Transformation Blueprint™", "/#methodology"]]} />
        <FooterColumn title="Explore" links={[["Executive Perspectives", "/#perspectives"], ["Context Ready", "/context-ready"], ["Business Independence", "/pathways/business-independence"], ["Schedule a Conversation", "/#contact"]]} />
        <FooterColumn title="Firm" links={[["About", "/#about"], ["Contact", "/#contact"], ["Privacy", "/privacy"], ["Website Terms", "/terms"]]} />
      </div>
      <div className="footer__base shell">
        <span>© 2026 Context Intelligence</span>
        <span>Strategy first. Context built in. <b>Business value measured.</b></span>
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
