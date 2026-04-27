"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import Image from "next/image";

function useScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useScrollReveal();

  const whatsappNumber = "5524999238735";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá%2C%20quero%20analisar%20meu%20caso%20previdenciário%20com%20a%20equipe.`;

  const beneficios = [
    "Aposentadoria",
    "BPC/LOAS",
    "Pensão por morte",
    "Benefício por incapacidade",
  ];

  const faq = [
    "Benefício negado: preciso fazer um novo requerimento?",
    "O que é feito para tentar reverter a decisão do INSS?",
    "Ainda não dei entrada no pedido: qual é o primeiro passo?",
  ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-card" data-reveal>
            <p className="tagline">Advocacia Previdenciária</p>
            <h1>Seu benefício pode ser conquistado com estratégia jurídica</h1>
            <p className="description">
              Com o apoio de nossa equipe jurídica especializada em Direito
              Previdenciário, você terá uma análise precisa do seu caso para a
              solicitação do benefício. E, caso ele já tenha sido negado pelo
              INSS, adotaremos as medidas cabíveis para reverter essa decisão.
            </p>
            <a
              className="cta-button"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              Falar com o analista jurídico no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container" data-reveal>
          <h2 data-reveal>Em qual benefício você precisa de apoio agora?</h2>
          <div className="benefit-grid">
            {beneficios.map((beneficio, index) => (
              <article
                key={beneficio}
                className="benefit-card"
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
              >
                <h3>{beneficio}</h3>
                <a
                  className="mini-cta"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Falar com a equipe
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-blue">
        <div className="container">
          <h2 data-reveal>Casos em que atuamos no Direito Previdenciário</h2>
        </div>
        <div className="container split">
          <div data-reveal>
            <h3>Aposentadorias</h3>
            <ul>
              <li>Aposentadoria por idade</li>
              <li>Aposentadoria por invalidez</li>
              <li>Aposentadoria por tempo de contribuição</li>
              <li>Aposentadoria especial</li>
              <li>Aposentadoria do professor</li>
              <li>Aposentadoria da pessoa com deficiência</li>
              <li>Cálculos e revisão para aposentadoria</li>
            </ul>

            <h3>Outros benefícios</h3>
            <ul>
              <li>Pensão por morte</li>
              <li>BPC/LOAS</li>
              <li>Auxílio-reclusão</li>
              <li>Auxílio acidente</li>
              <li>Auxílio-doença</li>
              <li>Auxílio-doença por acidente de trabalho</li>
              <li>Salário maternidade</li>
            </ul>
          </div>
          <div
            data-reveal
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
          >
            <h2>Motivos que levam o INSS a negar benefícios</h2>

            <div className="reason-accordion">
              <details>
                <summary>🔹 Pensão por Morte</summary>
                <p>
                  Geralmente é negada por falta de comprovação da dependência
                  econômica ou por suposta perda da qualidade de segurado do
                  falecido.
                </p>
                <p>
                  Essas situações podem ser revertidas após uma análise
                  criteriosa e a apresentação das provas corretas.
                </p>
              </details>

              <details>
                <summary>🔹 Aposentadorias</summary>
                <p>São negadas com frequência por:</p>
                <ul className="reason-list">
                  <li>erros na análise do INSS,</li>
                  <li>falta de reconhecimento do tempo de contribuição,</li>
                  <li>pendências cadastrais,</li>
                  <li>entendimento equivocado sobre idade ou carência.</li>
                </ul>
                <p>
                  Grande parte dessas negativas pode ser corrigida com revisão e
                  comprovações adicionais.
                </p>
              </details>

              <details>
                <summary>🔹 Auxílio-Doença</summary>
                <p>
                  Muitas negativas acontecem por não reconhecimento da
                  incapacidade laborativa.
                </p>
                <p>
                  Com uma avaliação detalhada dos documentos médicos e eventuais
                  complementações, é possível buscar a mudança do resultado.
                </p>
              </details>

              <details>
                <summary>🔹 BPC/LOAS</summary>
                <p>Costuma ser negado por:</p>
                <ul className="reason-list">
                  <li>ausência de comprovação da deficiência,</li>
                  <li>
                    renda per capita considerada acima de 1/4 do salário
                    mínimo.
                  </li>
                </ul>
                <p>
                  No entanto, existem outros meios de comprovação social e
                  econômica que podem modificar o entendimento inicial.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container faq" data-reveal>
          <h2 data-reveal>Dúvidas frequentes</h2>
          <div className="faq-list">
            {faq.map((question, index) => (
              <details
                key={question}
                data-reveal
                style={
                  { "--reveal-delay": `${index * 70 + 50}ms` } as CSSProperties
                }
              >
                <summary>{question}</summary>
                <p>
                  Cada caso é único. Por isso, avaliamos documentos, histórico
                  contributivo e estratégia adequada antes de indicar o próximo
                  passo.
                </p>
              </details>
            ))}
          </div>
          <a
            className="cta-button"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            data-reveal
            style={{ "--reveal-delay": "210ms" } as CSSProperties}
          >
            Tirar dúvidas no WhatsApp
          </a>
        </div>
      </section>

      <section className="section-dark">
        <div className="container about-layout">
          <div className="about-photo-shell" data-reveal>
            <Image
              src="/VictorH.jpeg"
              alt="Foto do Analista Jurídico Victor Hugo"
              width={700}
              height={900}
              className="about-photo"
            />
          </div>
          <div
            data-reveal
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
          >
            <h2>Quem somos</h2>
            <p className="about-text about-text-left">
              Somos um escritório de advocacia dedicado a oferecer um
              atendimento jurídico responsável, transparente e alinhado às
              necessidades de cada cliente. Atuamos com compromisso, técnica e
              ética, buscando sempre soluções eficazes e seguras para a defesa
              de direitos e prevenção de conflitos.
            </p>
            <p className="about-text about-text-left">
              Com uma equipe preparada e focada na excelência, nosso escritório
              atua para proporcionar tranquilidade, orientação adequada e
              resultados consistentes, sempre preservando os princípios da
              justiça e da integridade profissional.
            </p>
            <div className="cards">
              <article className="profile-card">
                <h3>Analista Jurídico Victor Hugo</h3>
                <p>
                  Análise inicial, orientação estratégica e acompanhamento do
                  seu caso do início ao fim.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <footer data-reveal>
        <div className="container footer-content">
          <strong>Fale Conosco</strong>
          <p>(24) 99923-8735</p>
          <p>Rua Elpides Dias Marciel, 285, Paraíso, Barra Mansa/RJ.</p>
          <p>victorhla2018@gmail.com</p>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        style={{
          position: "fixed",
          right: "1.1rem",
          bottom: "1.1rem",
          width: "58px",
          height: "58px",
          borderRadius: "999px",
          display: "grid",
          placeItems: "center",
          background: "#25d366",
          color: "#ffffff",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.28)",
          zIndex: 60,
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 8.02 0C3.65 0 .093 3.557.093 7.926c0 1.396.365 2.76 1.06 3.965L0 16l4.227-1.11a7.93 7.93 0 0 0 3.792.965h.004c4.369 0 7.926-3.557 7.926-7.926a7.86 7.86 0 0 0-2.348-5.603M8.023 14.52a6.59 6.59 0 0 1-3.35-.916l-.241-.144-2.507.658.669-2.445-.157-.252a6.57 6.57 0 0 1-1.016-3.499c.002-3.634 2.968-6.6 6.607-6.6a6.56 6.56 0 0 1 4.677 1.944 6.56 6.56 0 0 1 1.937 4.677c-.002 3.634-2.968 6.6-6.62 6.6m3.623-4.943c-.198-.099-1.173-.578-1.355-.644-.181-.066-.313-.099-.446.1-.132.198-.512.644-.627.776-.116.132-.231.149-.43.05-.198-.1-.838-.309-1.595-.985-.589-.525-.987-1.173-1.103-1.372-.115-.198-.012-.305.087-.404.09-.09.198-.231.297-.347.099-.116.132-.198.198-.33.066-.133.033-.248-.017-.347-.05-.099-.446-1.074-.61-1.47-.161-.387-.325-.334-.446-.34l-.38-.006a.73.73 0 0 0-.528.248c-.182.198-.694.677-.694 1.652 0 .975.71 1.917.809 2.05.099.132 1.396 2.132 3.383 2.988.473.204.842.325 1.13.416.475.151.907.13 1.249.079.381-.057 1.173-.479 1.34-.942.165-.462.165-.859.116-.942-.05-.083-.182-.133-.38-.232" />
        </svg>
      </a>
    </main>
  );
}
