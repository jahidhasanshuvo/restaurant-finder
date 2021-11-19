import puppeteer from "puppeteer";
export function validateInput(input: string): boolean {
  return !/[^0-9a-zA-Z& ]/.test(input);
}

export function todayDateInYYYYMMDDFormat(): string {
  return new Date()
    .toISOString()
    .slice(0, 10)
    .replace("-", "")
    .replace("-", "");
}

export async function checkGoogleMapContentLoaded(page: puppeteer.Page) {
  await page.waitForSelector(".m-google-map__content");
  const header = await page.$eval(
    ".ant-descriptions-title",
    (el) => el.innerHTML
  );
  expect(header).toEqual("Restaurant Information");

  const restaurantInformations = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".ant-descriptions-item-content > span"),
      (el) => el.innerHTML
    )
  );
  expect(restaurantInformations.length).toBe(3);
  restaurantInformations.forEach((item) => {
    expect(item.length).toBeGreaterThan(0);
  });
}
