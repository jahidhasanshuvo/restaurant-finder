import { Descriptions, Spin } from "antd";
import React from "react";
import "./index.scss";

type GoogleMapTypes = {
  target: string;
  loading: boolean;
  restaurant: string;
  address: string;
  distance: string;
};

const GoogleMap: React.FC<GoogleMapTypes> = ({
  target,
  loading,
  restaurant,
  address,
  distance,
}) => {
  const distanceInKilometer = parseInt(distance) / 1000 + " km";
  return (
    <div className="m-google-map">
      {!loading ? (
        <div className="m-google-map__content">
          <Descriptions
            className="m-google-map__description"
            title="Restaurant Information"
            bordered
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Restaurant Name">
              {restaurant}
            </Descriptions.Item>
            <Descriptions.Item label="Distance">
              {distanceInKilometer}
            </Descriptions.Item>
            <Descriptions.Item label="Address">{address}</Descriptions.Item>
          </Descriptions>
          <iframe
            className="m-google-map__iframe"
            title="Find Restaurant"
            width="100%"
            height="100%"
            src={`https://maps.google.com/maps?q=${target}&amp;z=25&amp;&output=embed`}
          />
        </div>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};

export default GoogleMap;
