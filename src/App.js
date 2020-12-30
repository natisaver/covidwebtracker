import React, {  useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import Infobox from './InfoBox';
import Infobox2 from './InfoBox2';
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
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({}); 
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 1.29, lng: 103});
  const [mapZoom, setMapZoom] = useState(7);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

 // USEEFFECT hook = runs a piece of code based on the given condition
 // ()=>{} arrow function

 //load countryInfo on launch
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=> response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

 //load specificCountryInfo for dropdown & table on launch 
  useEffect(() => {

    //code here runs whenever component renders & not again
    //the 2nd part [countries] means if countries var changes, useeffect updates again, if its just [], that means just do once.

    //getCountries async/await function => send request, await for it(promise to fulfill), then run
    //fetch is to query the API
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')

      .then((response) => response.json()) //get the json

      .then((data) => {
        const countries = data.map((n) => ( //storing in const countries, we using map to reformat each object in array denoted by n, into {new array format}
          {
            name: n.country, //country name
            value: n.countryInfo.iso2 //country code
          }
        ))
          //so const countries = [{name:'singapore', value:'SG'},{name:'unitedstates',value:'US'}]


        const sortedData = sortData(data); //sortData func frm util for table
        
        setTableData(sortedData); //sorted country case for tables
        setMapCountries(data); //all country info, including name and iso2 => for showDataOnMap
        setCountries(countries);//only name and iso2 => for menuItem


      })

    }

    getCountriesData();

  }, []);

  //on country change in dropdown
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = 
      countryCode === 'worldwide' 
        ? "https://disease.sh/v3/covid-19/all" 
        : decodeURI(`https://disease.sh/v3/covid-19/countries/${countryCode}`);
    
    await fetch(url)
      .then(response => response.json())

      .then((data) => {
        setSelectedCountry(countryCode);
        setCountryInfo(data);

        if (countryCode === "worldwide") {
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(2);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(3);
          console.log('map updated')
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
            <Select variant="outlined" onChange={onCountryChange} value={selectedCountry}>
              {/* drop down style, when change=>do onCountryChange*/}
              
              {/* looping thru all options with country name */}
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map(y => (
                  <MenuItem value={y.value}>{y.name}</MenuItem>
                ))
              }
            {/* so here countries.map={<menuitem1/>,<menuitem2/>.....} as dropdown options */}
            </Select>

          </FormControl>  
        </div>

        <div className="app__stats">
          {/* Infoboxes covid cases*/}
          <Infobox isActive={casesType==='cases'} onClick={e=>setCasesType('cases')} title='Coronavirus Cases' cases={prettyStats(countryInfo.todayCases)} total={prettyStats2(countryInfo.cases)}/>
          {/* Infoboxes covid recovered*/}
          <Infobox isGreen isActive={casesType==='recovered'} onClick={e=>setCasesType('recovered')} title='Recovered' cases={prettyStats(countryInfo.todayRecovered)} total={prettyStats2(countryInfo.recovered)}/>
          {/* Infoboxes covid deaths*/}  
          <Infobox isOrange isActive={casesType==='deaths'} onClick={e=>setCasesType('deaths')} title='Deaths' cases={prettyStats(countryInfo.todayDeaths)} total={prettyStats2(countryInfo.deaths)}/>
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
          <h3>🌐 Cases by Country</h3>
          <Table countries={tableData}/>
          {/* Graph */}
          <h3>🌎 Werldwide: new {casesType}</h3>
          <LineGraph casesType={casesType}/>
          <div className="credits">
            <a href="https://natisaver.github.io/trashcv/" className="credit">by nat :D 💩</a>
          </div>
            
        </CardContent>

        
      </Card>
      
    

    </div>
  );
}

export default App;
