import React, {  useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import Infobox from './InfoBox';
import Active from './Active';
import Map from './Map';
import Table from './Table';
import {sortData, prettyStats, prettyStats2} from './util';
import LineGraph from './LineGraph';
import './App.css';
import "leaflet/dist/leaflet.css";

function App() {
 //  STATE in React => Like a Variable 
 // you write the variable, set it, then useState and give it a value i.e here an empty array; to initialise to the var
 // {} is obj, [] is array

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({}); 
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 1.29, lng: 103});
  const [mapZoom, setMapZoom] = useState(7);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

 // USEEFFECT hook = runs a piece of code based on the given condition
 // ()=>{} arrow function

 //this first useeffect is to load all countryInfo on launch
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=> response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

 //for dropdown & table on launch 
  useEffect(() => {

    //code here runs whenever component renders & not again
    //the 2nd part [countries] means if countries var changes, useeffect updates again, if its just [], that means just do once.

    //getCountries async/await function => send request, await for it(promise to fulfill), then run
    //fetch is to query the API
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')

      .then((response) => response.json()) //get the json

      .then((data) => {
        const countries = data.map((country) => ( //using map to reformat objects in array: gives us an array of name & value by mapping countries
          {
            name: country.country, //country name
            value: country.countryInfo.iso2 //country code
          }
        ))

        const sortedData = sortData (data);
        setTableData(sortedData);
        setMapCountries(data); //all country info
        setCountries(countries);


      })

    }

    getCountriesData();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;


    const url = 
      countryCode === 'worldwide' 
        ? "https://disease.sh/v3/covid-19/all" 
        : decodeURI(`https://disease.sh/v3/covid-19/countries/${countryCode}`);
    
    await fetch(url)
      .then(response => response.json())

      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        if (countryCode === "worldwide") {
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(2);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
          console.log('gay')
        }
      })
  };

  console.log('country info', countryInfo) 

 /* notice for covid-19/countries we use ``` to allow js into it */

  return (
    <div className="app"> {/*BEM naming convention*/}
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Cases Summary</h1>
          <FormControl className="app__dropdown"> {/* BEM naming convention, component, then element */}
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/* Loop through all countries and show dropdown for each 
              for every country return menu item*/}


              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            {/* ES6 notation, => is return 
            map is like a for loop*/}
            </Select>

          </FormControl>  
        </div>

        <div className="app__stats">
          {/* Infoboxes covid cases*/}
          <Infobox title='Coronavirus Cases' cases={prettyStats(countryInfo.todayCases)} total={prettyStats2(countryInfo.cases)}/>
          {/* Infoboxes covid recovered*/}
          <Infobox title='Recovered' cases={prettyStats(countryInfo.todayRecovered)} total={prettyStats2(countryInfo.recovered)}/>
          {/* Infoboxes covid deaths*/}  
          <Infobox title='Deaths' cases={prettyStats(countryInfo.todayDeaths)} total={prettyStats2(countryInfo.deaths)}/>
          <Active title='Active⚠️' cases={prettyStats2(countryInfo.active)} total ={prettyStats2(countryInfo.critical)}/>
        
        </div>      



      {/* Header shift+alt+A to comment fast*/}
      
      {/* Title + Select Dropdown */}




      {/* Map */}
      <Map
      countries = {mapCountries}
      casesType={casesType}
      center={mapCenter}
      zoom={mapZoom}
      />


      </div>

      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>cases by country</h3>
          <Table countries={tableData}/>
          {/* Graph */}
          <h3>werldwide new cases</h3>
          <LineGraph />
        </CardContent>


      </Card>

    </div>
  );
}

export default App;
