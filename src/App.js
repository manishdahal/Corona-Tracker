import { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
  Paper,
  Tab,
  Tabs,
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
  const [tabIndex, settabIndex] = useState(1);

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
          const sortedData = sortData(data, "cases");
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
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
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app__header">
        <section className="section ">
          <p className="mp">
            <span>COVID Tracker</span>
          </p>
        </section>
      </div>

      <div className="app_tables">
        <div className="app__left">
          <FormControl className="app__dropdown">
            <Select
              className="dropdown__select"
              variant="outlined"
              onChange={onCountryChange}
              value={country}
              autoWidth={true}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>
                  <Flag country={country.value} /> {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="card card-stats">
            <InfoBox
              title="Total Cases"
              icon="users"
              total={countryInfo.cases}
            />

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
        </div>
        {/*TABLE*/}
        <div className="app__right">
          <Card>
            <CardContent className="card_content">
              <h1>Cases by Country</h1>
              <Paper className="tab">
                <Tabs
                  value={tabIndex}
                  onChange={(e, v) => settabIndex(v)}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Total" />
                  <Tab label="Recovered" />
                  <Tab label="Deaths" />
                </Tabs>
              </Paper>
              <Table countries={tableData} index={tabIndex} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default App;
