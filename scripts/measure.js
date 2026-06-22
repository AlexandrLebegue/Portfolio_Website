const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 900 });
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));
  const data = await p.evaluate(() => {
    const out = {};
    const grid = document.querySelector('[data-num]')?.closest('.grid');
    if (grid) {
      out.gridCols = getComputedStyle(grid).gridTemplateColumns;
      out.gridDisplay = getComputedStyle(grid).display;
      out.gridClass = grid.className;
    }
    const num = document.querySelector('[data-num]');
    if (num) { const r = num.getBoundingClientRect(); out.num = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) }; }
    const h3 = grid?.querySelector('h3');
    if (h3) { const r = h3.getBoundingClientRect(); out.title = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) }; }
    return out;
  });
  console.log(JSON.stringify(data, null, 2));
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
