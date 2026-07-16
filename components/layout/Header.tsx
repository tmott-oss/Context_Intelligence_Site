"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const links = [
  ["Blueprint", "/#blueprint"],
  ["Context Engine", "/#context-engine"],
  ["Assessment", "/#assessment"],
  ["About", "/#about"],
  ["Contact", "/#contact"],
] as const;

export function Header({ onRequest }: { onRequest: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
      </nav>
      <Button className="header-cta" onClick={onRequest}>Strategy Session</Button>
    </header>
  );
}
