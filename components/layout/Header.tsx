"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const links = [
  ["Intelligence", "#asset"],
  ["AI Blueprint", "#pathway-ai"],
  ["Independence", "#pathway-bi"],
  ["Assessment", "#assessment"],
  ["About", "#about"],
] as const;

export function Header({ onRequest }: { onRequest: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#main-content" aria-label="Context Intelligence home">
        <Image src="/assets/logo-mark.png" alt="" width={30} height={34} priority unoptimized />
        <span>Context <b>Intelligence</b></span>
      </a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen((value) => !value)}>
        <span className="sr-only">Toggle navigation</span>
        <i />
        <i />
      </button>
      <nav id="primary-nav" className={menuOpen ? "nav nav--open" : "nav"} aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <Button className="header-cta" onClick={onRequest}>Schedule</Button>
    </header>
  );
}
