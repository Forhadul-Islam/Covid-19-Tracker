import React from "react";
import "./Table.css";

function Table({ country }) {
  console.log(country);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <strong>Country</strong>
            </th>
            <th>
              <strong>Total Cases</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {country.map(({ country, cases, countryInfo }) => (
            <tr key={country}>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ padding: "5px" }}
                  height="20px"
                  width="25px"
                  src={countryInfo.flag}
                  alt="flag"
                />
                {country}
              </td>
              <td>{cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
