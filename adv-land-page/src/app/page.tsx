import Image from "next/image";

export default function Home() {
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
          <div className="hero-card">
            <p className="tagline">Escritório Sede de Justiça</p>
            <h1>Bacharel Victor Hugo</h1>
            <p className="subtitle">Atendimento previdenciário com estratégia e clareza</p>
            <p className="supervision-note">Supervisão jurídica da Dra. Rosana</p>
            <p className="description">
              Se o INSS negou seu benefício ou se você ainda vai iniciar o
              pedido, nossa equipe realiza uma análise técnica completa para
              definir o caminho mais seguro e aumentar suas chances de êxito.
            </p>
            <a
              className="cta-button"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar análise no WhatsApp
            </a>
          </div>

          <div className="hero-portrait-wrap">
            <div className="portrait-shell">
              <Image
                src="/Victor-img-removebg-preview.png"
                alt="Foto do Bacharel Victor Hugo"
                width={560}
                height={700}
                priority
                className="hero-portrait"
              />
            </div>
            <p className="portrait-caption">Bacharel Victor Hugo</p>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <h2>Em qual benefício você precisa de apoio agora?</h2>
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
                  Falar com a equipe
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-blue">
        <div className="container split">
          <div>
            <h2>Demandas previdenciárias atendidas</h2>
            <ul>
              <li>Aposentadoria por idade</li>
              <li>Aposentadoria por tempo de contribuição</li>
              <li>Aposentadoria da pessoa com deficiência</li>
              <li>Auxílio-doença e benefício por incapacidade</li>
            </ul>
          </div>
          <div>
            <h2>Principais motivos de negativa do INSS</h2>
            <ul>
              <li>Ausência de documentos e comprovação insuficiente</li>
              <li>Erro na análise administrativa do INSS</li>
              <li>Tempo de contribuição não reconhecido</li>
              <li>Interpretação incorreta da incapacidade laboral</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container faq">
          <h2>Dúvidas frequentes</h2>
          <div className="faq-list">
            {faq.map((question) => (
              <details key={question}>
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
          >
            Tirar dúvidas no WhatsApp
          </a>
        </div>
      </section>

      <section className="section-dark">
        <div className="container">
          <h2>Quem somos</h2>
          <p className="about-text">
            O Escritório Sede de Justiça oferece atendimento consultivo e
            estratégico em Direito Previdenciário, com condução do Bacharel
            Victor Hugo e supervisão da Dra. Rosana.
          </p>
          <div className="cards">
            <article className="profile-card">
              <h3>Bacharel Victor Hugo</h3>
              <p>Análise inicial, orientação e acompanhamento técnico do caso</p>
            </article>
          </div>
          <p className="supervision-footnote">
            Supervisão jurídica realizada pela Dra. Rosana.
          </p>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <strong>Escritório Sede de Justiça</strong>
          <p>Contato: (24) 99923-8735</p>
          <p>E-mail: victorhla2018@gmail.com</p>
        </div>
      </footer>
    </main>
  );
}
