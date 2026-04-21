export default function Home() {
  const whatsappNumber = "5511999999999";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20benef%C3%ADcio%20previdenci%C3%A1rio.`;

  const beneficios = [
    "Aposentadoria",
    "BPC/LOAS",
    "Pensao por morte",
    "Beneficio por incapacidade",
  ];

  const faq = [
    "Beneficio negado: preciso fazer um novo requerimento?",
    "O que e feito para que o INSS mude a decisao?",
    "Ainda nao realizei meu requerimento, como faco?",
  ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-card">
          <p className="tagline">Escritorio Sede de Justi{"\u00e7"}a</p>
          <h1>Bacharel Victor Hugo</h1>
          <p className="subtitle">Sob supervisao da Dra. Rosana</p>
          <p className="description">
            Atuacao estrategica em Direito Previdenciario para analise de
            negativas, revisao de beneficios e orientacao completa no processo
            administrativo e judicial.
          </p>
          <a
            className="cta-button"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            Fale agora no WhatsApp
          </a>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <h2>Para qual beneficio voce precisa de ajuda?</h2>
          <div className="benefit-grid">
            {beneficios.map((beneficio) => (
              <article key={beneficio} className="benefit-card">
                <h3>{beneficio}</h3>
                <a
                  className="mini-cta"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Clique e seja atendido
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-blue">
        <div className="container split">
          <div>
            <h2>Casos em que atuamos no Direito Previdenciario</h2>
            <ul>
              <li>Aposentadoria por idade</li>
              <li>Aposentadoria por tempo de contribuicao</li>
              <li>Aposentadoria da pessoa com deficiencia</li>
              <li>Auxilio-doenca e beneficio por incapacidade</li>
            </ul>
          </div>
          <div>
            <h2>Motivos que fazem o INSS negar beneficios</h2>
            <ul>
              <li>Ausencia de documentos e comprovacao insuficiente</li>
              <li>Erro na analise administrativa do INSS</li>
              <li>Falta de tempo de contribuicao reconhecido</li>
              <li>Interpretacao incorreta da incapacidade laboral</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container faq">
          <h2>Duvidas frequentes</h2>
          <div className="faq-list">
            {faq.map((question) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>
                  Cada caso deve ser avaliado de forma individual para definir
                  a estrategia mais segura e eficiente.
                </p>
              </details>
            ))}
          </div>
          <a
            className="cta-button"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            Fale com nossa equipe
          </a>
        </div>
      </section>

      <section className="section-dark">
        <div className="container">
          <h2>Quem somos</h2>
          <p className="about-text">
            O Escritorio Sede de Justi{"\u00e7"}a atua com atendimento consultivo e
            estrategico para causas previdenciarias, com conducao de Bacharel
            Victor Hugo e supervisao da Dra. Rosana.
          </p>
          <div className="cards">
            <article className="profile-card">
              <h3>Bacharel Victor Hugo</h3>
              <p>Atendimento inicial e analise tecnica do caso</p>
            </article>
            <article className="profile-card">
              <h3>Dra. Rosana</h3>
              <p>Supervisao juridica e conducao estrategica</p>
            </article>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <strong>Escritorio Sede de Justi{"\u00e7"}a</strong>
          <p>Contato: (11) 99999-9999</p>
          <p>E-mail: contato@sededejustica.com.br</p>
        </div>
      </footer>
    </main>
  );
}
