const puppeteer = require('puppeteer');

async function initBot(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(process.env.ETHEREAL_URL);
  await page.screenshot({ path: 'example.png' });

  await browser.close();
};

module.exports = initBot