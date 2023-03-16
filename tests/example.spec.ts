import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://otv.verwalt-berlin.de/ams/TerminBuchen?lang=en", {
    waitUntil: "networkidle",
  });

  await page.getByRole("link", { name: "Book Appointment" }).click();

  await page.getByRole("checkbox", { name: "gelesen" }).click();

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
