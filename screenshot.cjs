const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
  console.log('Starting Vite server...');
  const viteProcess = spawn('npm', ['run', 'dev'], { stdio: 'ignore', shell: true });
  
  // Give Vite a moment to start
  await new Promise(r => setTimeout(r, 3000));

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to app...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait a bit more for charts to render and animations to finish
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('Taking screenshot...');
  await page.screenshot({ path: 'assets/real_preview.png', fullPage: false });
  
  console.log('Closing...');
  await browser.close();
  viteProcess.kill();
  process.exit(0);
})();
