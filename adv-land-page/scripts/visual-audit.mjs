import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch {
  // Use an explicitly supplied module or the npm tool cache, never a runtime dependency.
  const cache = join(process.env.LOCALAPPDATA || '', 'npm-cache', '_npx');
  const modulePath = process.env.PLAYWRIGHT_MODULE || readdirSync(cache)
    .map(name => join(cache, name, 'node_modules', 'playwright'))
    .find(path => existsSync(join(path, 'package.json')));
  if (!modulePath) throw new Error('Playwright unavailable. Run npm exec --yes --package=playwright -- playwright --version first.');
  playwright = require(modulePath);
}

const phase = process.argv[2] || 'after';
const url = process.env.AUDIT_URL || 'http://127.0.0.1:3000';
const output = join(process.cwd(), 'artifacts', 'visual-audit', phase);
mkdirSync(output, { recursive: true });
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const report = { phase, url, browser: browser.version(), viewports: [] };
try {
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 768 ? 1024 : 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    // Visit the full page so baseline scroll reveals and lazy images are represented.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 90));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(850);
    await page.screenshot({ path: join(output, `${width}-full.png`), fullPage: true });
    await page.screenshot({ path: join(output, `${width}-hero.png`) });
    const measurements = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      overflowElements: [...document.querySelectorAll('body *')].filter(el => {
        const r = el.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1);
      }).slice(0, 15).map(el => el.tagName + '.' + el.className),
      h1Count: document.querySelectorAll('h1').length,
      brokenImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src),
      forms: document.forms.length,
      missingAnchorTargets: [...document.querySelectorAll('a[href^="#"]')].map(el => el.getAttribute('href')).filter(href => !document.getElementById(href.slice(1))),
      shortControls: [...document.querySelectorAll('a, button, summary')].filter(el => {
        const r = el.getBoundingClientRect(); return r.width && r.height && r.height < 44;
      }).map(el => ({ text: el.textContent.trim(), height: el.getBoundingClientRect().height })),
      links: [...document.querySelectorAll('a')].map(el => ({ text: el.textContent.trim() || el.getAttribute('aria-label'), href: el.getAttribute('href') })),
      bodyText: document.querySelector('main')?.innerText,
    }));
    const accordions = page.locator('main details');
    const accordionResults = [];
    for (let i = 0; i < await accordions.count(); i++) {
      const item = accordions.nth(i);
      await item.locator('summary').focus();
      await page.keyboard.press('Enter');
      const opened = await item.evaluate(el => el.open);
      const expandedOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      await page.keyboard.press('Space');
      const closed = await item.evaluate(el => !el.open);
      accordionResults.push({ opened, closed, expandedOverflow });
    }
    let menu = 'not present';
    if (phase !== 'before' && width < 900) {
      const toggle = page.locator('.menu-toggle');
      await toggle.click();
      const opened = await toggle.getAttribute('aria-expanded') === 'true';
      await page.screenshot({ path: join(output, `${width}-menu.png`) });
      await page.keyboard.press('Escape');
      const escapeClosed = await toggle.getAttribute('aria-expanded') === 'false';
      const focusRestored = await toggle.evaluate(el => el === document.activeElement);
      await toggle.click();
      await page.locator('#site-navigation').getByRole('link', { name: 'Benefícios', exact: true }).click();
      const anchorClosed = await toggle.getAttribute('aria-expanded') === 'false';
      await page.waitForTimeout(400);
      const anchorVisible = await page.locator('#beneficios').evaluate(el => el.getBoundingClientRect().top >= document.querySelector('header').getBoundingClientRect().bottom);
      await toggle.click();
      await page.mouse.click(10, page.viewportSize().height - 40);
      const outsideClosed = await toggle.getAttribute('aria-expanded') === 'false';
      menu = { opened, escapeClosed, focusRestored, anchorClosed, anchorVisible, outsideClosed, anchor: new URL(page.url()).hash };
    }
    const whatsappClicks = [];
    if (phase !== 'before') {
      // Confirm every CTA opens the original destination; do not contact the external service.
      await context.route('https://wa.me/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Local CTA verification</title>' }));
      const links = page.locator('a[href^="https://wa.me/"]');
      for (let i = 0; i < await links.count(); i++) {
        const expected = await links.nth(i).getAttribute('href');
        const popupPromise = page.waitForEvent('popup');
        await links.nth(i).click();
        const popup = await popupPromise;
        await popup.waitForLoadState('domcontentloaded');
        whatsappClicks.push({ matched: popup.url() === new URL(expected).href, safeRel: (await links.nth(i).getAttribute('rel')).includes('noopener') });
        await popup.close();
      }
      await page.locator('.reason-accordion summary').first().click();
      await page.locator('.faq-list summary').first().click();
      await page.screenshot({ path: join(output, `${width}-faq-expanded.png`), fullPage: true });
    }
    report.viewports.push({ width, status: response.status(), ...measurements, accordionResults, menu, whatsappClicks, errors: [...new Set(errors)] });
    await context.close();
  }
  if (phase !== 'before') {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    const page = await context.newPage();
    await page.goto(url);
    report.withoutJavaScript = { headingVisible: await page.locator('h1').isVisible(), mainVisible: await page.locator('main').isVisible(), navigationVisible: await page.locator('#site-navigation').isVisible() };
    await context.close();
    const motionContext = await browser.newContext({ reducedMotion: 'reduce' });
    const motionPage = await motionContext.newPage();
    await motionPage.goto(url);
    report.reducedMotion = await motionPage.evaluate(() => ({
      preference: matchMedia('(prefers-reduced-motion: reduce)').matches,
      smoothScroll: getComputedStyle(document.documentElement).scrollBehavior,
      buttonTransition: getComputedStyle(document.querySelector('.cta-button')).transitionDuration,
    }));
    report.contrast = await motionPage.evaluate(() => {
      const css = getComputedStyle(document.documentElement);
      function rgb(token) {
        let hex = (token.startsWith('#') ? token : css.getPropertyValue(token).trim()).replace('#', '');
        if (hex.length === 3) hex = [...hex].map(char => char + char).join('');
        return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
      }
      function luminance(values) { return values.map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0); }
      return [['--foreground', '--surface'], ['--muted', '--surface'], ['--muted', '--surface-soft'], ['--on-dark', '--surface-dark'], ['--on-dark-muted', '--surface-dark'], ['--surface', '--action'], ['--surface', '--action-hover'], ['--action', '--surface-soft'], ['--foreground', '#e2cc9f'], ['--foreground', '#f0debb'], ['--on-dark-muted', '#0c2430']].map(([foreground, background]) => {
        const a = luminance(rgb(foreground)), b = luminance(rgb(background));
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        return { foreground, background, ratio: +ratio.toFixed(2), passesAA: ratio >= 4.5 };
      });
    });
    await motionContext.close();
  }
} finally { await browser.close(); }
writeFileSync(join(output, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, viewports: report.viewports.map(viewport => ({
  width: viewport.width, status: viewport.status, overflow: viewport.overflow,
  overflowElements: viewport.overflowElements, h1Count: viewport.h1Count,
  brokenImages: viewport.brokenImages, forms: viewport.forms,
  missingAnchorTargets: viewport.missingAnchorTargets, shortControls: viewport.shortControls,
  accordionResults: viewport.accordionResults, menu: viewport.menu,
  whatsappClicks: viewport.whatsappClicks,
  errors: viewport.errors, linkCount: viewport.links.length,
})) }, null, 2));
if (report.viewports.some(v => v.status !== 200 || v.overflow || v.h1Count !== 1 || v.brokenImages.length || v.errors.length || v.missingAnchorTargets.length ||
  v.accordionResults.some(a => !a.opened || !a.closed || a.expandedOverflow) ||
  (typeof v.menu === 'object' && Object.entries(v.menu).some(([key, value]) => key !== 'anchor' && value !== true)) ||
  v.whatsappClicks.some(link => !link.matched || !link.safeRel)) ||
  report.contrast?.some(pair => !pair.passesAA) ||
  (report.withoutJavaScript && Object.values(report.withoutJavaScript).some(value => !value)) ||
  (report.reducedMotion && (report.reducedMotion.smoothScroll !== 'auto' || report.reducedMotion.buttonTransition !== '0s'))) process.exitCode = 1;
