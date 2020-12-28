import React from 'react'
import numeral from "numeral";
import {Circle, Popup} from "react-leaflet";

const casesTypeColors = {
    cases: {
      hex: "#b53e3e",
      rgb: "rgb(204, 16, 52)", //not used
      half_op: "rgba(204, 16, 52, 0.5)", //not used
      multiplier: 800,
    },
    recovered: {
      hex: "#aade50",
      rgb: "rgb(125, 215, 29)",//not used
      half_op: "rgba(125, 215, 29, 0.5)",//not used
      multiplier: 1200,
    },
    deaths: {
      hex: "#f72625",
      rgb: "rgb(251, 68, 67)",//not used
      half_op: "rgba(251, 68, 67, 0.5)",//not used
      multiplier: 2000,
    },
};

export const sortData = (data) => {
    let sortedData = [...data];
    // ... is spread syntax, here we use for array literal
    //adds all elements of data into sortData

    sortedData.sort((a, b) => a.cases>b.cases ? -1 : 1);
    return sortedData;
};
    //.sort arranges in ascending order
    //but here we give sort order of a>b, so descending


    /* sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1; //false
        } else {
            return 1; //true 
        }
    })
    return sortedData

} */

export const prettyStats = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const prettyStats2 = (stat) =>
    stat ? `${numeral(stat).format("0.0a")}` : "0";

export const showDataOnMap = (data, casesType ='cases') => 
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color = {casesTypeColors[casesType].hex}
            fillColor = {casesTypeColors[casesType].hex}
            radius = {
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier / 2
            }
            >
            <Popup>
                <div className="info-container">
                    <div
                        className='info-flag'
                        style={{backgroundImage: `url(${country.countryInfo.flag})`}}
                    />
                    <div className='info-name'>{country.country}</div>
                    <div className='info-cases'>Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className='info-recovered'>Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className='info-deaths'>Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>

    ))

//draw circle on map & tooltip aka hover/click






