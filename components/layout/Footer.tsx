import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid shell">
        <div className="footer__brand">
          <div className="footer__logo-crop">
            <Image src="/assets/logo-full.png" alt="Context Intelligence" width={300} height={110} unoptimized />
          </div>
          <p>The executive advisory practice for building organizational intelligence into a strategic asset.</p>
        </div>
        <FooterColumn title="Discipline" links={[["Organizational Intelligence", "#asset"], ["The methodology", "#methodology"], ["Process", "#process"]]} />
        <FooterColumn title="Engagements" links={[["AI Transformation Blueprint", "#pathway-ai"], ["Business Independence Blueprint", "#pathway-bi"], ["Assessment", "#assessment"]]} />
        <FooterColumn title="Firm" links={[["About", "#about"], ["Contact", "#contact"], ["Graph Lab", "/graph-lab"]]} />
      </div>
      <div className="footer__base shell">
        <span>© 2026 Context Intelligence</span>
        <span>Capture. Connect. Activate. <b>Advantage.</b></span>
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
