const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });

  await page.goto("https://advocacy-template.framer.website/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);
  console.log("Page:", await page.title());
  await revealPage(page, 1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: "artifacts/template-screenshots/advocacy-template-desktop.png",
    fullPage: true,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await revealPage(page, 844);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: "artifacts/template-screenshots/advocacy-template-mobile.png",
    fullPage: true,
  });
  console.log("Saved desktop and mobile screenshots.");
  await browser.close();
}

async function revealPage(page, viewportHeight) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += Math.round(viewportHeight * 0.7)) {
    await page.evaluate((position) => window.scrollTo(0, position), y);
    await page.waitForTimeout(300);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

