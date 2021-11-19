import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/RESTAURANT NEAR ME/i);
  expect(linkElement).toBeInTheDocument();
});
