import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import puppeteer from "puppeteer";
import { Provider } from "react-redux";
import Home from ".";
import {
  validateInput,
  todayDateInYYYYMMDDFormat,
  checkGoogleMapContentLoaded,
} from "../../assets/scripts/home";
import store from "../../redux/store";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
const WrappedHome = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
test("Input Validation function check", () => {
  expect(validateInput("Search restaurant 123")).toBe(true);
  expect(validateInput("Se~23")).toBe(false);
  expect(validateInput("Se!23")).toBe(false);
  expect(validateInput("Se@23")).toBe(false);
  expect(validateInput("Se#23")).toBe(false);
  expect(validateInput("Se%23")).toBe(false);
  expect(validateInput("Se^23")).toBe(false);
  expect(validateInput("Se*23")).toBe(false);
  expect(validateInput("Se(23")).toBe(false);
  expect(validateInput("Se)23")).toBe(false);
  expect(validateInput("Se-23")).toBe(false);
  expect(validateInput("Se=23")).toBe(false);
  expect(validateInput("Se{23")).toBe(false);
  expect(validateInput("Se}23")).toBe(false);
  expect(validateInput(`Se\\23`)).toBe(false);
  expect(validateInput("Se|23")).toBe(false);
  expect(validateInput("Se:23")).toBe(false);
  expect(validateInput("Se;23")).toBe(false);
  expect(validateInput("Se'23")).toBe(false);
  expect(validateInput(`Se"23`)).toBe(false);
});

test("todayDateInYYYYMMDDFormat function check", () => {
  const todayDateInExpectedFormat = new Date()
    .toISOString()
    .slice(0, 10)
    .replace("-", "")
    .replace("-", "");
  expect(todayDateInYYYYMMDDFormat()).toEqual(todayDateInExpectedFormat);
});

test("Only valid input is saving to the state", () => {
  render(<WrappedHome />);
  const inputBox = document.querySelector(
    ".p-home__text-input > .ant-input"
  ) as HTMLInputElement;
  userEvent.type(inputBox, "Star R~`!@#$%^*()_+-=[]{}:;'\\\"estaurant");
  const inputBoXvalue = inputBox.value;
  expect(inputBoXvalue).toEqual("Star Restaurant");
});

describe("warning is showing when invalid input given", () => {
  it("Alphanumeric error when invalid character given", () => {
    render(<WrappedHome />);
    const inputBox = document.querySelector(
      ".p-home__text-input > .ant-input"
    ) as HTMLInputElement;
    userEvent.type(inputBox, "ssddssd@");
    const errorMessage = screen.getByText("Only alphanumeric are allowed");
    expect(errorMessage).toBeInTheDocument();
  });

  it("More than 50 character are not allowed", () => {
    render(<WrappedHome />);
    const inputBox = document.querySelector(
      ".p-home__text-input > .ant-input"
    ) as HTMLInputElement;
    userEvent.type(
      inputBox,
      "12345678901234567890123 456789012345678901234567890"
    );
    const errorMessage = screen.getByText("Only 50 characters are allowed");
    expect(errorMessage).toBeInTheDocument();
  });
});

it("button is loading when entering into the page", async () => {
  render(<WrappedHome />);
  const loadingIcon = document.querySelector(
    ".p-home__button > .ant-btn-loading-icon"
  ) as HTMLSpanElement;
  expect(loadingIcon).toBeInTheDocument();
});

describe("e2e testing", () => {
  let browser: puppeteer.Browser, page: puppeteer.Page;

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterEach(() => {
    browser.close();
  });

  it("Checking on page load restaurant information with map is rendering", async () => {
    await page.goto("http://localhost:3000");
    await checkGoogleMapContentLoaded(page);
  }, 10000);

  it("Keyword search testing", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".ant-input");
    await page.type(".ant-input", "restaurant");
    await page.click(".p-home__button");
    await checkGoogleMapContentLoaded(page);
  }, 10000);
});
