import React from "react";
import "./Table.css";
import Flag from "react-flagkit";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, countryInfo, cases }) => (
        <tr>
          <td
            style={{
              display: "flex",
            }}
          >
            <Flag country={countryInfo.iso2} /> <p> </p> {country}
          </td>
          <td>{new Intl.NumberFormat().format(cases)}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
