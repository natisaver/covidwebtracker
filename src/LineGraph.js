import React, {useState, useEffect} from 'react'
import {Line} from "react-chartjs-2";
import numeral from "numeral";

/***LINEGRAPH OPTIONS***/
const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRation: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales: {
        xAxes: [{
            type: "time",
            time: {
                format: "MM/DD/YY",
                tooltipFormat: 'll'
            },
            
        }],
        yAxes: [{
            gridLines: {
                display: true,
            },
            ticks: {
                callback:function (value,index,values) {
                    return numeral(value).format("0a")  
                },
            },
        }],
    }
}

/***LINEGRAPH COMPONENT***/
//{casesType} is decided by the setState in app.js => "cases" (default), "deaths" or "recovered"

function LineGraph({ casesType = 'cases'}) {
    //data state
    const [data, setData] = useState({});

    //creating func to update datapoint for a case type (either case,death or recovered)
    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint; //create lastDataPoint "let" variable: only be used in this block (let/var/const)

        for(let date in data[casesType]) { //for x in y (date is x, data[casesType] is y)
            if (lastDataPoint) { //let lastDataPoint is undefined, so this wont execute until lastDataPoint = a value
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint //take no. of cases (new date) - no .of cases (date - 1 day)
                }
            chartData.push(newDataPoint); 
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData
    }

    //getting data from api using buildChartData function
    useEffect(()=>{
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=60')
            .then(response => response.json())
            .then(data => {
                let chartData = buildChartData(data, casesType)
                setData(chartData)
            })
        }

        fetchData();

    }, [casesType]) //this array here means if casesType changes, the useEffect hook runs again, if empty array, it runs once

    //color code constant
    const colorByTypes = {
        cases: {
          background: "rgba(204,16,52,0.5)",
          border: "#cc1034",
        },
        deaths: {
          background: "#d19c4c",
          border: "#9d5f38",
        },
        recovered: {
          background: "rgba(125, 215, 29,0.5)",
          border: "#7dd71d",
        },
      };   
    
    //return line color
    return (
        <div>
            {data?.length > 0 && ( //optional chaining
             <Line
                options = {options}
                data={{
                    datasets:[
                        {
                            data: data,
                            backgroundColor: colorByTypes[casesType].background,
                            borderColor: colorByTypes[casesType].border,
                        }
                    ]
                }}
            />   
            )}
            
        </div>
    )
}

export default LineGraph
