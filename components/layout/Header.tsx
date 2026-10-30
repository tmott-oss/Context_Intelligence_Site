"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { audiences } from "@/components/content/audiences";
import { Button } from "@/components/ui/Button";

const links = [
  ["Assessment", "/assessment"],
  ["Why It Matters", "/#why-it-matters"],
  ["AI Blueprint", "/#methodology"],
  ["Perspectives", "/#perspectives"],
  ["About", "/#about"],
] as const;

export function Header({ onRequest, requestLabel = "Request a Strategy Session" }: { onRequest: () => void; requestLabel?: string }) {
  const pathname = usePathname();
  const whoWeHelpRef = useRef<HTMLDetailsElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1280px)");
    const sync = () => {
      const details = whoWeHelpRef.current;
      if (!details) return;
      if (query.matches) details.setAttribute("open", "");
      else details.removeAttribute("open");
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    if (!window.matchMedia("(max-width: 1280px)").matches) whoWeHelpRef.current?.removeAttribute("open");
  };

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Context Intelligence home">
        <Image src="/assets/logo-mark.png" alt="" width={30} height={34} priority unoptimized />
        <span>Context <b>Intelligence</b></span>
      </Link>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen((value) => !value)}>
        <span className="sr-only">Toggle navigation</span>
        <i />
        <i />
      </button>
      <nav id="primary-nav" className={menuOpen ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        <details className="nav-group" ref={whoWeHelpRef}>
          <summary>Who we help</summary>
          <div className="nav-group__menu" id="who-we-help-menu">
            {audiences.map((audience) => (
              <Link
                key={audience.href}
                href={audience.href}
                aria-current={pathname === audience.href ? "page" : undefined}
                onClick={closeMenus}
              >
                <strong>{audience.label}</strong>
                <span>{audience.description}</span>
              </Link>
            ))}
          </div>
        </details>
        {links.map(([label, href]) => <Link key={href} href={href} onClick={closeMenus}>{label}</Link>)}
      </nav>
      <Button className="header-cta" onClick={onRequest}>{requestLabel}</Button>
    </header>
  );
}
