import { render, screen } from "@testing-library/react";
import TextInput from "./index";
import puppeteer from "puppeteer";
test("Checking the span is comming when error", () => {
  render(<TextInput error="Must be alphanumeric" />);
  const spanText = screen.getByText("Must be alphanumeric");
  expect(spanText).toBeInTheDocument();
});
describe("End-To-End Testing", () => {
  it("Checking the cancel button is working", async () => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.type(".ant-input", "value");
    await page.click(".ant-input-suffix");
    const inputValue = await page.$eval(".ant-input", (input) =>
      input.getAttribute("value")
    );
    expect(inputValue).toBe("");
    browser.close();
  }, 60000);
});
