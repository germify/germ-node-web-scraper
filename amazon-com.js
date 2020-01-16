const puppeteer = require('puppeteer');
const sourceURL = 'https://www.amazon.com/Thin-Mint-Do-si-do-Combo-Pack/dp/B00BRXE74Y?pf_rd_p=b14de56b-0fb5-49c5-891d-0d7a5cc73c0e&pd_rd_wg=wrgFA&pf_rd_r=9TT569WDTV0M2GG6Y8NG&ref_=pd_gw_cr_cartx&pd_rd_w=GsuEH&pd_rd_r=0f201cdb-962c-4cc7-b639-614bb177e58e';

async function scrapeData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="landingImage"]');
  const getImageURL = await el.getProperty('src');
  const rawImageURL = await getImageURL.jsonValue();
  const imageURL = rawImageURL.trim();

  const [el2] = await page.$x('//*[@id="productTitle"]');
  const getTitle = await el2.getProperty('textContent');
  const rawTitle = await getTitle.jsonValue();
  const title = rawTitle.trim();

  const [el3] = await page.$x('//*[@id="price_inside_buybox"]');
  const getPrice = await el3.getProperty('textContent');
  const rawPrice = await getPrice.jsonValue();
  const price = rawPrice.trim();

  console.log({ imageURL, title, price });

  browser.close();
}

scrapeData(sourceURL);
