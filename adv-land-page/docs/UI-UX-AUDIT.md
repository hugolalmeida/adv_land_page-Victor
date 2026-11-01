# Auditoria e refinamento de UI/UX

Data: 1 de novembro de 2026. Escopo: refinamento local da landing page existente, com preservação de conteúdo, contato e regras de negócio. Nenhuma publicação foi realizada.

## 1. Diagnóstico inicial

- **Framework:** Next.js 16.2.4 com App Router, React 19.2.4, TypeScript em modo estrito e Tailwind CSS 4 via PostCSS. ESLint 9 com configuração Next.
- **Arquitetura:** uma rota pública (`/`), layout raiz para fontes e metadados; sem API, banco, autenticação ou formulário. Antes, toda a página era um Client Component por causa do observador de rolagem.
- **Componentes:** não havia componentes compartilhados. Hero, quatro benefícios, listas de atuação, quatro motivos de negativa, três FAQs, apresentação profissional, contatos e WhatsApp flutuante estavam em `src/app/page.tsx`.
- **Assets e fontes:** fotografias locais em `public/`, Manrope e Playfair Display por `next/font/google`. Configuração Next padrão. README ainda baseado no scaffold.
- **Dependências:** somente Next, React e React DOM em produção. Nenhuma dependência da aplicação foi adicionada ou alterada neste trabalho.

| Prioridade | Antes | Depois | Motivo |
| --- | --- | --- | --- |
| P1 | Elementos com `opacity: 0` dependiam do IntersectionObserver; capturas mostraram blocos invisíveis após percorrer a página | Conteúdo renderizado e visível por padrão; observador removido | Evitar perda visual de conteúdo e melhorar a experiência sem JavaScript |
| P2 | Sem navegação ou atalhos para as seções | Cabeçalho com âncoras, menu móvel e link de pular conteúdo | Facilitar orientação e acesso por teclado |
| P2 | Hero em caixa sobre imagem obscurecida; apresentação profissional somente no final | Composição em duas colunas no desktop, texto e retrato local com áreas próprias | Dar prioridade à mensagem e identificar a pessoa responsável pelo atendimento |
| P2 | Caixas repetidas, inclusive contêineres dentro de contêineres | Benefícios em blocos abertos, listas e acordeões separados por função | Melhorar ritmo e reduzir ruído |
| P2 | Hierarquia concentrada em títulos centralizados e seções com tratamentos semelhantes | Títulos alinhados ao grid, medidas de leitura e espaçamento consistente | Diferenciar os níveis de informação |
| P2 | Estados de interação pouco sistemáticos; telefone e e-mail eram texto simples | Estados de foco, hover e pressão; links `tel:` e `mailto:` | Tornar as ações claras e utilizáveis |
| P3 | Gradientes, sombras e estilos inline duplicados no botão flutuante | Superfícies sólidas e tokens; sombra discreta apenas no controle flutuante | Simplificar manutenção e apresentação |

Não havia overflow ou erros de console na rodada inicial estabilizada com Webpack. Os sete acordeões já funcionavam pelo teclado; esse comportamento foi preservado. O FAQ repetia a mesma resposta para três perguntas: os textos foram mantidos conforme a restrição de conteúdo.

## 2. Referências examinadas e aplicação real

Foram lidos os três READMEs e as instruções pertinentes. Não foram instalados plugins, copiados designs completos ou executados instaladores remotos.

| Referência | Leitura e compatibilidade | Aplicação |
| --- | --- | --- |
| [Emil Kowalski](https://github.com/emilkowalski/skills) | `emil-design-eng/SKILL.md` e `remove-animations/SKILL.md`; instruções Markdown portáveis, adaptáveis ao Codex | Feedback curto, transições explícitas, remoção de animações que atrasavam ou ocultavam a leitura |
| [Impeccable](https://github.com/pbakaus/impeccable) | README declara Codex; leitura de `.agents/skills/impeccable/SKILL.md`, `reference/polish.md` e `reference/craft-floor.md` | Preservação da identidade e dos fatos, tokens, hierarquia, contraste, revisão por screenshots e correção de estados |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) | README documenta integração Codex; leitura de `skills/taste-skill/SKILL.md` | Direção baseada no material real do projeto e revisão do resultado em três larguras |

Inspeção de scripts: foram examinados `package.json` e o launcher Windows `skill/scripts/impeccable.cmd` do Impeccable, que pode baixar e executar um binário, e `scripts/inspect.mjs` do Taste, que importa auxiliares de CDP e grava capturas. Nenhum foi executado; não houve necessidade de baixar seus binários ou executar seus imports. As orientações foram adaptadas diretamente, com regras persistentes em `AGENTS.md`. Não se afirma execução dos comandos de auditoria dessas ferramentas.

Também foi consultada a documentação local fornecida pelo Next sobre Server/Client Components e imagens. A skill OpenAI Docs foi utilizada apenas para conferir os comandos de integração MCP.

## 3. Direção de arte implementada

- **Identidade:** manutenção do azul-petróleo, com superfícies brancas e azuladas claras; contraste quente no CTA principal. A composição usa o retrato `Victor_foto.png`, já presente no projeto. A imagem `VictorH.jpeg` permanece em “Quem somos”.
- **Tipografia:** Manrope para leitura e controles, Playfair Display para títulos; escala fluida e títulos balanceados. Textos principais, listas e respostas usam 16px inclusive no celular.
- **Grid:** largura máxima de 1200px; margens adaptativas; hero em duas colunas a partir de 900px; benefícios em quatro, duas e uma coluna; listas de atuação em duas colunas no tablet e uma no celular.
- **Tokens:** cores semânticas, espaçamento, largura máxima, raio de controles, duração e curva de transição em `globals.css`. Valores centrais: texto `#152f39`, azul-petróleo `#102f3d`, superfície suave `#eaf0f0`, ação `#196447` e CTA do hero `#e2cc9f`.
- **Componentes:** conteúdo existente e disclosures nativos preservados. `ContactLink` centraliza destino, proteção de nova aba e seta SVG; `SiteHeader` isola o estado do menu. A página volta a ser um Server Component.
- **Ícones:** SVGs funcionais com traço consistente; ícone WhatsApp existente preservado. Marcadores decorativos de emoji foram removidos dos títulos de acordeão.
- **Movimento:** somente feedback de controles; sem loops ou revelação obrigatória por rolagem. Preferência por movimento reduzido desativa transições e rolagem suave.
- **Acessibilidade:** landmarks, um h1, seções nomeadas, foco visível, destinos de âncoras com compensação do cabeçalho, alvos de pelo menos 44px de altura e menu com Escape/restauração de foco. Sem JavaScript, a navegação móvel permanece aberta e utilizável.

## 4. Arquivos alterados ou adicionados

- `AGENTS.md`: regras persistentes e referências adotadas, preservando as instruções originais do Next.
- `src/app/page.tsx`: estrutura semântica, hero, componentes de contato, âncoras e preservação do conteúdo.
- `src/app/globals.css`: tokens, layout, tipografia, responsividade e estados.
- `src/components/site-header.tsx`: cabeçalho e menu móvel.
- `src/components/contact-link.tsx`: CTA compartilhado e ícone de seta.
- `scripts/visual-audit.mjs`: teste reproduzível com Playwright local, sem dependência de produção.
- `artifacts/visual-audit/`: capturas antes/depois, relatórios JSON e comparador HTML.
- `docs/UI-UX-AUDIT.md`: este relatório.

Layout raiz, metadados, fontes, configuração Next e arquivos de dependências foram preservados. Conferência por diff e comparação de 56 trechos estáticos de texto JSX do original: nenhum ausente; “Advocacia Previdenciária” foi movido para o cabeçalho. Listas de benefícios e perguntas também foram mantidas. O número e a mensagem de WhatsApp permanecem os mesmos.

## 5. Validação e evidências

O MCP Playwright não estava disponível entre as ferramentas desta sessão nem em `codex mcp list`. O Playwright 1.64.1 foi disponibilizado no cache de ferramentas npm e executado diretamente com o Chrome instalado, por script local. Isso é validação real com Playwright, mas não uma sessão MCP.

O Turbopack falhou durante a prévia, com recarregamentos e erro `Next.js package not found`. A prévia foi reiniciada com Webpack. O modo padrão do projeto não foi alterado. A comparação inicial usa a prévia Webpack; a rodada final usa a build de produção.

Resultados e capturas: [comparador](../artifacts/visual-audit/index.html), [antes](../artifacts/visual-audit/before/report.json), [depois](../artifacts/visual-audit/after/report.json).

**Resultado final:** script Playwright concluído com exit code 0 na build de produção. Nas três larguras: HTTP 200, um h1, zero overflow, zero imagens quebradas, zero destinos de âncora ausentes, zero controles visíveis abaixo de 44px de altura e zero erros de console/runtime. Os sete acordeões passaram por abertura/fechamento via teclado em cada largura; os sete CTAs passaram pela verificação de popup e destino em cada largura. Todas as verificações do menu móvel passaram em 390 e 768px. Sem JavaScript e com movimento reduzido, as verificações passaram. As onze combinações de cor medidas passaram em AA para texto normal, com razão mínima de 5,44:1. As capturas finais das três larguras foram inspecionadas visualmente. ESLint sem warnings, TypeScript e build de produção passaram.

| Verificação | Execução |
| --- | --- |
| Larguras | 390×900, 768×1024 e 1440×900, DPR 1 |
| Capturas | Primeira tela e página completa antes/depois; menu móvel e disclosures expandidos na versão final |
| Responsividade | Inspeção visual e medição de overflow horizontal, inclusive com acordeões abertos |
| Teclado | Enter abre e Espaço fecha cada um dos sete acordeões, nas três larguras |
| Menu móvel | Abrir, Escape, restauração de foco, seleção de seção, destino abaixo do cabeçalho e clique externo |
| CTAs | Clique nos sete links WhatsApp em cada largura; popup e URL conferidos com acesso externo interceptado; nenhuma mensagem enviada |
| Links | Destinos de âncoras existentes e atributos de telefone/e-mail conferidos; aplicativos externos não foram abertos |
| Console e imagens | Captura de erros do console/runtime e inspeção de imagens carregadas |
| Sem JavaScript | Título, conteúdo e navegação visíveis em 390px |
| Movimento reduzido | Preferência emulada, rolagem automática e transições de botão em 0s |
| Contraste | Cálculo WCAG das combinações de texto e superfície definidas no script; resultados numéricos no JSON |
| Código | ESLint com zero warnings, TypeScript sem emissão e build de produção com Webpack |
| Formulários | Não aplicável: o projeto não contém formulários |

Comandos para reproduzir, na pasta `adv-land-page`:

```powershell
node node_modules/eslint/bin/eslint.js --max-warnings=0
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/next/dist/bin/next build --webpack
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3000
# Em outro terminal, com Chrome instalado:
npm.cmd exec --yes --package=playwright -- playwright --version
node scripts/visual-audit.mjs after
```

O script tenta primeiro o Playwright instalado localmente e depois o cache npm do Windows; `PLAYWRIGHT_MODULE` permite indicar outro caminho. `AUDIT_URL` permite usar outra porta. A fase `before` deve ser executada somente antes de alterações, para não sobrescrever a referência original com a página nova.

## 6. Pendências e limites

Atualização após a auditoria: diante da recorrência do panic `Next.js package not found`, os scripts `dev` e `build` em `package.json` passaram a incluir `--webpack`. O README e o AGENTS documentam esse contorno. Essa alteração substitui a observação histórica acima sobre manter o bundler padrão. O servidor iniciado antes da alteração precisa ser encerrado e reiniciado para carregar o novo comando. A integração MCP é opcional; sua ausência não é uma pendência para a validação local com Playwright.

Validação do contorno: `npm.cmd run dev -- --hostname 127.0.0.1 --port 3100` iniciou identificando Webpack. Requisições repetidas retornaram HTTP 200 com o conteúdo esperado; não houve panic durante a verificação. A rodada Playwright em 390, 768 e 1440px terminou com exit code 0 e sem erros de console/runtime; evidências em `artifacts/visual-audit/dev-webpack/`. O comando atualizado `npm.cmd run build` também concluiu com exit code 0, incluindo TypeScript e geração das páginas estáticas. O servidor temporário de validação foi encerrado.

- **MCP:** para habilitar a integração numa próxima sessão, executar os comandos abaixo e reiniciar o Codex. Não foi alterada a configuração global nesta tarefa. [Documentação Codex](https://developers.openai.com/codex/mcp) · [Playwright MCP](https://github.com/microsoft/playwright-mcp).

```powershell
codex mcp add playwright -- npx -y @playwright/mcp@latest
codex mcp list
```

- Testes executados no Chrome em modo headless. Safari, Firefox, dispositivos físicos e leitor de tela não foram testados; as verificações não equivalem a uma certificação completa de acessibilidade.
- As respostas repetidas do FAQ foram preservadas. Uma futura revisão editorial depende de autorização para alterar conteúdo.
- Capturas são evidências visuais, não uma medição de conversão ou um teste de desempenho Lighthouse. Nenhum resultado comercial foi inferido.
