"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./contact-link";

const navigation = [
  ["#beneficios", "Benefícios"],
  ["#atuacao", "Atuação"],
  ["#duvidas", "Dúvidas"],
  ["#sobre", "Sobre Victor"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="container header-layout">
        <a className="brand" href="#inicio" aria-label="Victor Hugo — início">
          <span className="brand-monogram" aria-hidden="true">VH</span>
          <span className="brand-name">Victor Hugo<span>Advocacia Previdenciária</span></span>
        </a>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Fechar" : "Menu"}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <nav id="site-navigation" className="site-nav" aria-label="Navegação principal" data-open={open}>
          {navigation.map(([href, label]) => (
            <a key={href} href={href} onClick={() => {
              setOpen(false);
              // Move focus out of the collapsed mobile navigation to its destination.
              document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true });
            }}>{label}</a>
          ))}
          <a className="header-contact" href="#contato" onClick={() => {
            setOpen(false);
            document.getElementById("contato")?.focus({ preventScroll: true });
          }}>Fale com o advogado <ArrowIcon className="arrow-up-right" /></a>
        </nav>
      </div>
      <noscript><style>{`@media(max-width:899px){.menu-toggle{display:none}.site-nav{display:flex;position:static;width:100%;border:0;padding:16px 0}.header-layout{flex-wrap:wrap}.site-header{position:relative}}`}</style></noscript>
    </header>
  );
}

