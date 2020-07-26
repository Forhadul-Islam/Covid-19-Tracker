import React from "react";
import "./Table.css";

function Table({ country }) {
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
          {country.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>{cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
