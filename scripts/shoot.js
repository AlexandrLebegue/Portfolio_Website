/* Capture d'écran headless du site local pour auto-vérification visuelle.
   Usage: node scripts/shoot.js [url] [outDir] [steps] */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const URL = process.argv[2] || 'http://localhost:3000';
const OUT = process.argv[3] || path.join('scripts', 'shots');
const STEPS = Number(process.argv[4] || 9);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  // Mouvement réduit : on fige les animations (Lenis off, contenus visibles) pour
  // une capture fiable du LAYOUT (sans état d'animation intermédiaire).
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 3000)); // fonts + gsap

  const height = await page.evaluate(() => document.body.scrollHeight);
  const maxY = Math.max(0, height - 800);
  for (let i = 0; i < STEPS; i += 1) {
    const y = Math.round((maxY * i) / (STEPS - 1));
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 900));
    const file = path.join(OUT, `shot-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: file });
    // eslint-disable-next-line no-console
    console.log('shot', i, '@y=', y, '->', file);
  }
  await browser.close();
  // eslint-disable-next-line no-console
  console.log('done. scrollHeight=', height);
})().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('SHOOT_ERROR', e);
  process.exit(1);
});
