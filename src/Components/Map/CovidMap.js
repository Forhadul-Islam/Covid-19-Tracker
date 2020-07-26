import React from "react";
import "./Map.css";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import numeral from "numeral";

function CovidMap({ countries, casesType, center, zoom }) {
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 800,
    },
    deaths: {
      hex: "#fb443",
      multiplier: 800,
    },
  };
  const myIcon = L.icon({
    iconUrl:
      "https://toppng.com/uploads/preview/simple-location-map-pin-icon3-orange-free-vector-data-location-map-icon-vector-11563001562xylr91otnh.png",
    iconSize: [29, 33],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  return (
    <div className="map">
      <Map style={{ height: "450px" }} center={center} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countries.map((country) => (
          <Marker
            icon={myIcon}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div className="popup-info">
                <div className="info-img">
                  <img src={country.countryInfo.flag} alt="flag"></img>
                </div>
                <div className="info-countryName">
                  <strong>{country.country}</strong>
                </div>
                <div className="info-cases">
                  <strong>Cases:</strong> {numeral(country.cases).format("0,0")}
                </div>
                <div className="info-recovered">
                  <strong>Recovered:</strong>{" "}
                  {numeral(country.recovered).format("0,0")}
                </div>
                <div className="info-deaths">
                  <strong>Deaths:</strong>{" "}
                  {numeral(country.deaths).format("0,0")}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* <Circle
          center={center}
          fillOpacity={0.4}
          color={casesTypeColors.cases.hex}
          fillColor={casesTypeColors.cases.hex}
          radius={900000}
        ></Circle> */}
      </Map>
    </div>
  );
}

export default CovidMap;
