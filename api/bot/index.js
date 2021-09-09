const puppeteer = require('puppeteer');
const chromium = require('chrome-aws-lambda');

async function initBot(){
  // const browser = await puppeteer.launch({ headless: true, userDataDir: '/tmp/my-profile-directory' });

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
    userDataDir: '/tmp/my-profile-directory',
  });
  
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.setCacheEnabled(false);
  
  await page.goto(process.env.ETHEREAL_URL);
  return { page, browser } ;
};

async function createEmail() {
  try {
    const { page, browser }  = await initBot();
    await page.waitFor(1000);
    const buttonCreate = await page.$('.btn.btn-primary');
    await page.waitFor(500);
    buttonCreate.click();
  
    await page.waitFor(2000);
  
    const config = await page.$$eval('code', options => options.map(option => option.textContent));

    if (config.length > 0) {
      const data = {
        name: config[0],
        email: config[1],
        password: config[2],
        smtp: config[3],
        port: config[4],
        msg: "Success"
      };
  
      await browser.close();
      return data;
    }

    await browser.close();
    return { msg: "Error" };
  } catch (e) {
    console.error(e);
    return { msg: "Error" };
  }
};

module.exports = {
  createEmail
}