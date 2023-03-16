import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, Builder, By, WebDriver, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { sleep } from "@minbao/promise-utils";

puppeteer.use(StealthPlugin());

// (async function example() {
//   let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
//   driver.manage().setTimeouts({ implicit: 10000 });
//   const documentInitialised = () =>
//     driver.executeScript("return document.readyState");

//   try {
//     await driver.get("https://otv.verwalt-berlin.de/ams/TerminBuchen?lang=en");

//     (await driver.findElement(By.linkText("Book Appointment"))).click();

//     await sleep(10000);

//     (await driver.findElement(By.id("xi-cb-1"))).click();

//     await sleep(10000);

//     (
//       await driver.findElement(By.id("applicationForm:managedForm:proceed"))
//     ).click();

//     await sleep(10000);

//     (await driver.findElement(By.id("xi-sel-400"))).click();
//   } finally {
//     // await driver.quit();
//   }
// })();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 5000,
  });
  const page = await browser.newPage();

  await page.goto("https://otv.verwalt-berlin.de/ams/TerminBuchen?lang=en");

  await page.setViewport({ width: 1080, height: 1024 });

  const bookAppointment = await page.waitForSelector("text/Book Appointment");

  await Promise.all([
    bookAppointment?.click(),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  (await page.waitForSelector("#xi-cb-1"))?.click();

  // Promise.all([
  // page.waitForNavigation({ waitUntil: "networkidle0" }),
  //   page.click(`text/Next`),
  //   page.waitForNavigation({ waitUntil: "networkidle0" }),
  // ]);

  // await page.click("#applicationForm\:managedForm:proceed");

  // await Promise.all([
  // page.waitForNavigation(),
  //   page.waitForSelector("#xi-sel-400"),
  // ]);

  // await page.waitForSelector("xpath/#xi-cb-1");

  // await page.click("xpath/#xi-cb-1");

  // await page.waitForSelector("xpath/#applicationForm:managedForm:proceed");

  // await page.click("xpath/#applicationForm:managedForm:proceed");

  await page.screenshot({ path: "./sshot.png" });

  // await browser.close();
})();
