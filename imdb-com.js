const puppeteer = require('puppeteer');
const sourceURL = 'https://www.imdb.com/title/tt0133093/?ref_=fn_al_tt_1';

async function scrapeData(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x(
    '//*[@id="title-overview-widget"]/div[1]/div[3]/div[1]/a/img'
  );
  const getImageURL = await el.getProperty('src');
  const rawImageURL = await getImageURL.jsonValue();
  const imageURL = rawImageURL.trim();

  const [el2] = await page.$x(
    '//*[@id="title-overview-widget"]/div[1]/div[2]/div/div[2]/div[2]/h1/text()'
  );
  const getTitle = await el2.getProperty('textContent');
  const rawTitle = await getTitle.jsonValue();
  const title = rawTitle.trim();

  const [el3] = await page.$x('//*[@id="titleYear"]/a');
  const getYear = await el3.getProperty('textContent');
  const rawYear = await getYear.jsonValue();
  const year = rawYear.trim();

  const [el4] = await page.$x(
    '//*[@id="title-overview-widget"]/div[1]/div[2]/div/div[1]/div[1]/div[1]/strong/span'
  );
  const getRating = await el4.getProperty('textContent');
  const rawRating = await getRating.jsonValue();
  const rating = rawRating.trim() + '/10';

  console.log({ imageURL, title, year, rating });

  browser.close();
}

scrapeData(sourceURL);
