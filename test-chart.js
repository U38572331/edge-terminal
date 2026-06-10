import puppeteer from 'puppeteer';
import { createServer } from 'vite';

(async () => {
  console.log("Starting vite server...");
  const server = await createServer({
    root: process.cwd(),
    server: { port: 5173 },
  });
  await server.listen();
  server.printUrls();

  console.log("Launching puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.toString()));

  console.log("Navigating to charts page...");
  await page.goto('http://localhost:5173/#/charts', { waitUntil: 'networkidle2' });

  // Wait 3 seconds for chart to load or error to appear
  await new Promise(r => setTimeout(r, 3000));

  // Screenshot
  const screenshotPath = 'C:/Users/user/.gemini/antigravity/brain/34f34ef7-7339-4114-b07e-acd4d5656f9c/scratch/test-screenshot.png';
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved to ${screenshotPath}`);

  await browser.close();
  await server.close();
  console.log("Done.");
  process.exit(0);
})();
