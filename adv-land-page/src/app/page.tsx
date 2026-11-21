import Image from "next/image";
import SiteHeader from "@/components/site-header";
import { ArrowIcon, ContactLink, whatsappLink } from "@/components/contact-link";

export default function Home() {
  const assetBasePath =
    process.env.GITHUB_ACTIONS === "true" &&
    process.env.GITHUB_REPOSITORY === "hugolalmeida/adv_land_page-Victor"
      ? "/adv_land_page-Victor"
      : "";
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
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <section className="hero" id="inicio" aria-labelledby="hero-title" tabIndex={-1}>
          <div className="container hero-layout">
            <div className="hero-card">
              <p className="hero-kicker">Advocacia Previdenciária · Barra Mansa, RJ</p>
              <h1 id="hero-title">Seu caso previdenciário merece atenção individual.</h1>
              <p className="description">
                Victor Hugo acompanha cada etapa do seu caso previdenciário,
                desde a análise dos documentos até a orientação sobre os caminhos
                possíveis para solicitar um benefício ou contestar uma negativa
                do INSS.
              </p>
              <ContactLink>
                Falar com Victor Hugo no WhatsApp
              </ContactLink>
              <a className="hero-secondary" href="#atuacao">Veja como posso ajudar <ArrowIcon className="arrow-down" /></a>
            </div>
            <figure className="hero-portrait">
              <Image src={`${assetBasePath}/Victor_foto.png`} alt="Victor Hugo, advogado previdenciário" fill preload sizes="(max-width: 599px) 100vw, (max-width: 899px) 85vw, 42vw" />
              <figcaption><strong>Victor Hugo</strong><span>Advocacia Previdenciária</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="section-white benefits-section" id="beneficios" aria-labelledby="benefits-title" tabIndex={-1}>
          <div className="container">
            <p className="section-kicker">Atendimento individual</p>
            <h2 id="benefits-title">Orientação previdenciária para cada etapa da sua vida</h2>
            <div className="benefit-grid">
              {beneficios.map((beneficio) => (
                <article key={beneficio} className="benefit-card">
                  <h3>{beneficio}</h3>
                  <ContactLink className="mini-cta" label={`Conversar sobre ${beneficio}`}>Saiba como posso ajudar</ContactLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-blue" id="atuacao" aria-labelledby="practice-title" tabIndex={-1}>
          <div className="container">
            <p className="section-kicker">Atuação</p>
            <h2 id="practice-title">Acompanhamento jurídico previdenciário, feito de perto</h2>
          </div>
          <div className="container split">
            <div>
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
            <div>
              <h2>Teve um benefício negado pelo INSS?</h2>

              <div className="reason-accordion">
                <details>
                  <summary>Pensão por Morte</summary>
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
                  <summary>Aposentadorias</summary>
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
                  <summary>Auxílio-Doença</summary>
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
                  <summary>BPC/LOAS</summary>
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

        <section className="section-white faq-section" id="duvidas" aria-labelledby="faq-title" tabIndex={-1}>
          <div className="container faq">
            <h2 id="faq-title">Dúvidas frequentes</h2>
            <div className="faq-list">
              {faq.map((question) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>
                    Cada caso é único. Por isso, Victor analisa documentos, histórico
                    contributivo e estratégia adequada antes de indicar o próximo
                    passo.
                  </p>
                </details>
              ))}
            </div>
            <ContactLink>
              Tirar dúvidas no WhatsApp
            </ContactLink>
          </div>
        </section>

        <section className="section-dark" id="sobre" aria-labelledby="about-title" tabIndex={-1}>
          <div className="container about-layout">
            <div className="about-photo-shell">
              <Image
                src={`${assetBasePath}/VictorH.jpeg`}
                alt="Victor Hugo, advogado previdenciário"
                width={700}
                height={900}
                sizes="(max-width: 599px) 90vw, (max-width: 899px) 60vw, 35vw"
                className="about-photo"
              />
            </div>
            <div>
              <p className="section-kicker">Sobre</p>
              <h2 id="about-title">Atendimento próximo, com Victor Hugo</h2>
              <p className="about-text about-text-left">
                Victor Hugo oferece atendimento previdenciário individual,
                responsável e transparente. Cada caso começa com escuta e análise
                cuidadosa da documentação e do histórico de contribuição.
              </p>
              <p className="about-text about-text-left">
                A orientação é clara e alinhada à situação de cada pessoa, com
                acompanhamento próximo nas etapas do pedido ou na análise de uma
                negativa do INSS.
              </p>
              <div className="cards">
                <article className="profile-card">
                  <h3>Victor Hugo · Advocacia Previdenciária</h3>
                  <p>
                    Análise inicial, explicação dos próximos passos e
                    acompanhamento individual do seu caso.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer id="contato" aria-labelledby="contact-title" tabIndex={-1}>
        <div className="container footer-content">
          <p className="section-kicker">Atendimento individual</p>
          <h2 id="contact-title">Converse com Victor Hugo</h2>
          <p><a className="footer-phone" href="tel:+5524999238735">(24) 99923-8735</a></p>
          <p>Rua Elpides Dias Marciel, 285, Paraíso, Barra Mansa/RJ.</p>
          <p><a href="mailto:victorhla2018@gmail.com">victorhla2018@gmail.com</a></p>
        </div>
          <div className="container footer-bottom">
            <span>Victor Hugo · Advocacia Previdenciária</span>
            <a href="https://hugolalmeida.github.io/hugo-almeida-portfolio/" target="_blank" rel="noopener noreferrer">
              Feito por Hugo L. Almeida
            </a>
            <a href="#inicio">Voltar ao início <ArrowIcon className="arrow-up" /></a>
          </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
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
    </>
  );
}

