import Link from "next/link";
import { audiences, type AudienceId } from "@/components/content/audiences";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function WhoWeHelp({ current }: { current?: AudienceId }) {
  return (
    <section id="who-we-help" className="clarity-section who-we-help anchor-section" aria-labelledby="who-we-help-title">
      <div className="shell">
        <div className="clarity-heading">
          <Eyebrow>Who we help</Eyebrow>
          <h2 id="who-we-help-title">Three ways in. Same standard of work.</h2>
        </div>
        <ul className="who-we-help__grid">
          {audiences.map((audience) => {
            const isCurrent = audience.id === current;
            return (
              <li key={audience.id}>
                <Link
                  className={isCurrent ? "family-card is-current" : "family-card"}
                  href={audience.href}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <span>{audience.label}</span>
                  <p>{audience.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
