import "./Table.css";
import React from "react";
import Flag from "react-flagkit";
import { sortData } from "./util";

function Table(props) {
  let sortit = () => {
    let sorted;
    if (props.index === 0) sorted = sortData(props.countries, "cases");
    if (props.index === 1) sorted = sortData(props.countries, "recovered");
    if (props.index === 2) sorted = sortData(props.countries, "deaths");
    return sorted;
  };

  return (
    <div className="table">
      {props.countries ? (
        sortit(props.countries).map(
          ({ country, countryInfo, cases, deaths, recovered }) => (
            <tr>
              <td
                style={{
                  display: "flex",
                }}
              >
                <Flag country={countryInfo.iso2} /> <p> </p> {country}
              </td>
              <td>
                {props.index == 0 && new Intl.NumberFormat().format(cases)}
                {props.index == 1 && new Intl.NumberFormat().format(recovered)}
                {props.index == 2 && new Intl.NumberFormat().format(deaths)}
              </td>
            </tr>
          )
        )
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
}

export default Table;
