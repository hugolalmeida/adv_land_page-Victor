const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto("http://127.0.0.1:3000", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  console.log("Page:", await page.title());
  await revealPage(page, 900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "artifacts/victor-adaptation/desktop.png",
    fullPage: true,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await revealPage(page, 844);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "artifacts/victor-adaptation/mobile.png",
    fullPage: true,
  });
  await browser.close();
}

async function revealPage(page, viewportHeight) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += Math.round(viewportHeight * 0.7)) {
    await page.evaluate((position) => window.scrollTo(0, position), y);
    await page.waitForTimeout(200);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

