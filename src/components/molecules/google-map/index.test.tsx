import { render, screen } from "@testing-library/react";
import GoogleMap from "./index";
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
test("Checking all information are showing", () => {
  render(
    <GoogleMap
      loading={false}
      target={process.env.REACT_APP_STARTING_POINT as string}
      address="dhaka"
      distance="2000"
      restaurant="Star Hotel"
    />
  );
  const addressText = screen.queryByText("dhaka");
  const restaurantText = screen.queryByText("Star Hotel");
  const distanceText = screen.queryByText("2 km");
  const spinner = document.querySelector(".ant-spin-dot");
  expect(addressText).toBeInTheDocument();
  expect(restaurantText).toBeInTheDocument();
  expect(distanceText).toBeInTheDocument();
  expect(spinner).not.toBeInTheDocument();
});

test("Checking loader is showing", () => {
  render(
    <GoogleMap
      loading={true}
      target={process.env.REACT_APP_STARTING_POINT as string}
      address="dhaka"
      distance="2000"
      restaurant="Star Hotel"
    />
  );
  const addressText = screen.queryByText("dhaka");
  const restaurantText = screen.queryByText("Star Hotel");
  const distanceText = screen.queryByText("2 km");
  const spinner = document.querySelector(".ant-spin-dot");
  expect(addressText).toBeNull();
  expect(restaurantText).toBeNull();
  expect(distanceText).toBeNull();
  expect(spinner).toBeInTheDocument();
});
