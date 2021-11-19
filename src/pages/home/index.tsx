import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleMap from "../../components/molecules/google-map";
import { gmapSelector } from "../../redux/google-map/googleMap.selector";
import { fetchRestaurantData } from "../../redux/google-map/googleMap.action";
import "./index.scss";
import TextInput from "../../components/atoms/input";
import { validateInput } from "../../assets/scripts/home";

const Home = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const dispatch = useDispatch();
  const {
    targettedRestaurant,
    address,
    restaurantName,
    distance,
    loading,
    error,
    errorMessage,
  } = useSelector(gmapSelector);
  useEffect(() => {
    const enterKeyListner = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        dispatch(fetchRestaurantData(keyword));
      }
    };
    document.addEventListener("keydown", enterKeyListner);
    return () => {
      document.removeEventListener("keydown", enterKeyListner);
    };
  }, [dispatch, keyword]);

  useEffect(() => {
    dispatch(fetchRestaurantData(""));
  }, [dispatch]);

  const findRestaurant = useCallback(() => {
    dispatch(fetchRestaurantData(keyword));
  }, [dispatch, keyword]);

  const changeKeyword = useCallback((event) => {
    const input = event.target.value;
    if (!validateInput(input)) {
      setInputError("Only alphanumeric are allowed");
    } else if (input.length > 50) {
      setInputError("Only 50 characters are allowed");
    } else {
      setInputError("");
      setKeyword(input);
    }
  }, []);
  return (
    <div className="p-home">
      <h1 className="p-home__title"> restaurant near me</h1>
      <div className="p-home__form">
        <TextInput
          className="p-home__text-input"
          type="text"
          placeholder="type any keyword"
          maxLength={51}
          onChange={changeKeyword}
          value={keyword}
          allowClear
          prefix="*optional"
          error={inputError}
        />
        <Button
          className="p-home__button"
          type="primary"
          onClick={findRestaurant}
          loading={loading}
        >
          Find a Near By Restaurant
        </Button>
      </div>
      {!error ? (
        <GoogleMap
          target={targettedRestaurant}
          loading={loading}
          restaurant={restaurantName}
          address={address}
          distance={distance}
        />
      ) : (
        <div className="p-home__error">
          <h2>{errorMessage}</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
