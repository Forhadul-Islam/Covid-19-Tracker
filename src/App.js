import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  FormGroup,
  Switch,
} from "@material-ui/core";
import "./App.css";
import { configure } from "@testing-library/react";
import InfoBox from "./Components/InfoBox/InfoBox";
import Table from "./Components/Table/Table";
import { sortData, prettyPrintState } from "./Components/utility/util";
import LineChart from "./Components/LineChart/LineChart";
import Map from "./Components/Map/Map";
import CovidMap from "./Components/Map/CovidMap";
import numeral from "numeral";
import { FormControlLabel } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 22.3569, lng: 91.7832 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  console.log(casesType);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
        setMapZoom(4);
      });
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const countryDetail = async () => {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);
          const lat_long = {
            lat: data.countryInfo.lat,
            lng: data.countryInfo.long,
          };
          setMapCenter(lat_long);
        });
    };
    countryDetail();
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

        const sortedData = sortData(data);
        setCountries(countries);
        setTableData(sortedData);
        setMapCountries(data);
      });
  }, []);

  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div>
      <div className="app__top__style"></div>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1 className="app__header__title">
              COVID-19 Tracker{" "}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch checked={checked} onChange={toggleChecked} />
                  }
                  label="Dark mode"
                />
              </FormGroup>
            </h1>
            <FormControl>
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="Worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.name} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__status">
            <div onClick={() => setCasesType("cases")}>
              <InfoBox
                isPink
                title="Coronavirus cases"
                cases={prettyPrintState(countryInfo.todayCases)}
                total={prettyPrintState(countryInfo.cases)}
              />
            </div>
            <div onClick={() => setCasesType("recovered")}>
              <InfoBox
                isBlue
                title=" Recover"
                cases={prettyPrintState(countryInfo.todayRecovered)}
                total={prettyPrintState(countryInfo.recovered)}
              />
            </div>
            <div onClick={() => setCasesType("deaths")}>
              <InfoBox
                isRed
                title=" Death"
                cases={prettyPrintState(countryInfo.todayDeaths)}
                total={prettyPrintState(countryInfo.deaths)}
              />
            </div>
          </div>
          {mapCountries && (
            <Map
              casesType={casesType}
              countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
            ></Map>
          )}
        </div>
        <Card className="app__right">
          <CardContent>
            <div className="countrywise__data">
              <h2 className="countrywise__data__title">Counttrywise cases</h2>
              <Table country={tableData} />
            </div>
            <div>
              <h2 className="countrywise__data__title">Worldwide cases</h2>
              <LineChart casesType={casesType} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
