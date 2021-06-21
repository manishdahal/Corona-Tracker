import { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Table from "./Table";
import { sortData } from "./util";
import Flag from "react-flagkit";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const ENDPOINT = "https://disease.sh/v3/covid-19";

  useEffect(() => {
    fetch(`${ENDPOINT}/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(`${ENDPOINT}/countries`)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode, event.target);
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `${ENDPOINT}/all`
        : `${ENDPOINT}/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__header">
        <section class="section ">
          <p class="mp">
            <span>COVID Tracker</span>
          </p>
        </section>
      </div>

      <div className="app_tables">
        <div className="container">
          <InfoBox title="Total Cases" icon="users" total={countryInfo.cases} />

          <InfoBox
            title="Recovered"
            icon="child"
            total={countryInfo.recovered}
          />

          <InfoBox title="Deaths" icon="proc" total={countryInfo.deaths} />

          <InfoBox
            title="New Cases Today"
            icon="bell"
            total={countryInfo.todayCases}
          />
        </div>

        {/*DROPDOWN*/}
        <div className="dropdown__container">
          <FormControl className="app__dropdown">
            <Select
              className="dropdown__select"
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>
                  <Flag country={country.value} /> <p> </p> {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/*INFO BOX*/}
        <div>
          <Card className="app__right">
            <CardContent>
              <h1>Total Cases by Country</h1>
              <Table countries={tableData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default App;
