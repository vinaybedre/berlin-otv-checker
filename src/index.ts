// playwright-extra is a drop-in replacement for playwright,
// it augments the installed playwright with plugin functionality
import { chromium } from "playwright-extra";

// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
// Note: playwright-extra is compatible with most puppeteer-extra plugins
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import player from "play-sound";
import notifier from "node-notifier";
import { Page } from "@playwright/test";

// Add the plugin to playwright (any number of plugins can be added)
chromium.use(StealthPlugin());

// const beep = new Beep()

// ...(the rest of the quickstart code example is the same)
chromium.launch({ headless: false, slowMo: 1500 }).then(async (browser) => {
  const page = await browser.newPage();

  await page.goto("https://otv.verwalt-berlin.de/ams/TerminBuchen?lang=en", {
    waitUntil: "networkidle",
  });

  await page.getByRole("link", { name: "Book Appointment" }).click();

  await page.check("#xi-cb-1");

  await page.getByRole("button", { name: "Next" }).click();

  await page.selectOption("#xi-sel-400", { value: "436" });
  await page
    .getByRole("combobox", { name: "Citizenship *" })
    .selectOption("India");

  await page.selectOption("#xi-sel-422", "three people");

  await page.selectOption("#xi-sel-427", "yes");

  await page.selectOption("#xi-sel-428", "India");

  await page.waitForLoadState("networkidle");

  await page.getByText(/.*Extend a residence title.*/i).click();

  await page.getByText(/.*Economic activity.*/i).click();

  await page
    .getByText(/.*EU Blue Card \/ Blaue Karte EU \(sect. 18b para. 2\)*/i)
    .click();

  for (let i = 1; ; i++) {
    console.log(i);
    try {
      await page.getByRole("button", { name: "Next" }).click();
    } catch (e) {
      player().play("./beep.mp3");
      break;
    }

    try {
      await page
        .getByText(
          /.*There are currently no dates available for the selected service.*/
        )
        .click();
    } catch (e) {
      player().play("./beep.mp3");
      break;
    }
  }

  notifier.notify({ message: "Round complete" });

  //   await browser.close();
});

async function start() {
  const browser = await chromium.launch({ headless: false, slowMo: 1500 });

  const page = await browser.newPage();

  await page.goto("https://otv.verwalt-berlin.de/ams/TerminBuchen?lang=en", {
    waitUntil: "networkidle",
  });

  await page.getByRole("link", { name: "Book Appointment" }).click();

  await page.check("#xi-cb-1");

  await page.getByRole("button", { name: "Next" }).click();

  await page.selectOption("#xi-sel-400", { value: "436" });
  await page
    .getByRole("combobox", { name: "Citizenship *" })
    .selectOption("India");

  await page.selectOption("#xi-sel-422", "three people");

  await page.selectOption("#xi-sel-427", "yes");

  await page.selectOption("#xi-sel-428", "India");

  await page.waitForLoadState("networkidle");

  await page.getByText(/.*Extend a residence title.*/i).click();

  await page.getByText(/.*Economic activity.*/i).click();

  await page
    .getByText(/.*EU Blue Card \/ Blaue Karte EU \(sect. 18b para. 2\)*/i)
    .click();

  return page;
}

async function next(page: Page) {
  for (let i = 1; ; i++) {
    console.log(i);
    try {
      await page.getByRole("button", { name: "Next" }).click();
    } catch (e) {
      throw e;
    }

    try {
      await page
        .getByText(
          /.*There are currently no dates available for the selected service.*/
        )
        .click();
    } catch (e) {
      player().play("./beep.mp3");
      break;
    }
  }
}

// (async () => {
//   const page = await start();
//   try {
//     await next(page);
//   } catch (e) {}
// })();
