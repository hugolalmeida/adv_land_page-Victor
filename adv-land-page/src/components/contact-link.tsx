import type { ReactNode } from "react";

export const whatsappLink = "https://wa.me/5524999238735?text=Olá%2C%20quero%20analisar%20meu%20caso%20previdenciário%20com%20a%20equipe.";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

export function ContactLink({ children, className = "cta-button", label }: { children: ReactNode; className?: string; label?: string }) {
  return <a className={className} href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}<ArrowIcon /></a>;
}
