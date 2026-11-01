<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project and UI rules

- This is the existing Victor Hugo previdenciary landing page, not a greenfield app. Keep Next.js App Router, React, TypeScript and Tailwind 4. Do not change factual/legal copy, benefit lists, contact details, WhatsApp number or prefilled message without an explicit request.
- Keep the established petrol blue identity and Manrope / Playfair Display typography. Use semantic CSS tokens in `src/app/globals.css` for colors, spacing, measure, controls and motion. Prefer solid surfaces, legible typography, open lists and clear groups over repeated nested cards, gradients and decorative shadows.
- Preserve native `details`/`summary` disclosures. Use semantic landmarks, one h1, logical headings, visible keyboard focus, descriptive names, a skip link and touch targets of at least 44px. Target WCAG AA text contrast. Anchor destinations must remain visible below the sticky header.
- Content must be readable without JavaScript. Keep the page a Server Component and isolate browser interaction in small Client Components. Never hide reading content behind scroll observers.
- Use existing local images through `next/image`, meaningful alt text and responsive `sizes`. Keep image dimensions stable and preload only the hero. Do not invent credentials, testimonials, client counts, success rates or guarantees.
- Animate only useful feedback, with explicit properties and short durations; gate hover effects to hover-capable pointers and respect `prefers-reduced-motion`. No looping CTA pulse, scroll locking, parallax or scroll reveals on every section.
- Keep navigation usable on mobile, with accurate `aria-expanded`, Escape dismissal and focus restoration. Never leave focus in a hidden menu. No motion, UI or icon dependencies unless justified; use small authored SVGs for functional icons.
- Validate the actual rendered page at 390, 768 and 1440px before and after meaningful UI work. Run lint, TypeScript and a production build. Check overflow, disclosure keyboard operation, navigation, link destinations, image loading, console errors, no-JavaScript behavior and reduced motion. Save screenshots and factual results under `artifacts/visual-audit`; never claim unexecuted checks.
- The `dev` and `build` npm scripts explicitly use Webpack because Turbopack repeatedly failed with `Next.js package not found` in this Windows checkout. Keep this workaround unless a verified fix is applied. Next.js remains the framework. For QA, `node node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1` is equivalent.

### Methodological references adopted (2026-11-01)

These are adapted guidelines, not installed plugins or permission to execute upstream scripts:
- Emil Kowalski: https://github.com/emilkowalski/skills — `emil-design-eng` and `remove-animations`: deliberate feedback, fast easing and removal of reading-blocking motion.
- Impeccable: https://github.com/pbakaus/impeccable — `impeccable`, `polish` and `craft-floor`: preserve product truth, establish hierarchy and tokens, audit accessibility/responsiveness, inspect rendered output.
- Taste Skill: https://github.com/Leonxlnx/taste-skill — `design-taste-frontend`: derive art direction from the subject's real content and existing imagery; inspect three widths and revise screenshots.
- The user's scoped request and existing brand take precedence over generic upstream house styles, randomized directions, installer workflows or proposed extra dependencies. Inspect any third-party script and its imports before executing. No upstream installers or binaries are required for this project.
