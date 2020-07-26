import React from "react";
// import { Popup } from "leaflet";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

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
    hex: "#EE4A0D ",
    multiplier: 800,
  },
};

//for sorting data using cases
export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
};

//prEttyPrintState (formate the number)
export const prettyPrintState = (state) => {
  return state ? `${numeral(state).format("0.0a")}` : "---";
};
//DRAW circle on the map
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      key={country.country}
      center={{ lat: country.countryInfo.lat, lng: country.countryInfo.long }}
      fillOpacity={0.3}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
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
            <strong>Deaths:</strong> {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
