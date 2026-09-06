import { expect, test } from "@playwright/test";

test.use({ launchOptions: { channel: "chrome" } });

test("side portraits remain readable", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => localStorage.setItem("i18nextLng", "ar"));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.screenshot({ path: "hero-images-final.jpg", type: "jpeg", quality: 86 });
  await expect(page.locator("#home")).toBeVisible();
  expect(errors).toEqual([]);
});
