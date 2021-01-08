import React, { useState, useEffect } from "react";
import { Card, MenuItem, FormControl, Select, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(['worldwide']);
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState([3]);
    const [mapCountries, setMapCountries] = useState([]);

    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
          await fetch ("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
            const countries = data.map((country) => ({
                name: country.country, //United States
                value: country.countryInfo.iso2 // USA
              }));

              const sortedData = sortData(data);
              setTableData(sortedData);
              setCountries(countries);
              setMapCountries(data);
        });
      };
      getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
      const countryCode = event.target.value;
      // Have dropdown stick with your selection
      setCountry(countryCode);
      const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
      .then((response) => response.json())
      .then((data) => {
          setCountry(countryCode);
          // All of the data from the country response
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
      });
    };

   return (
    <div className="app">

      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>

            {/* Loop through all the countries and show a drop down*/}
            {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
            ))};
            </Select>
          </FormControl>
        </div> 

        <div className="app__stats">
            <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />   
            <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />   
            
        </div>
        {/* want all the response for all of the countries passed to draw circles */}
          <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>        
    </div>
  );
}

export default App;
