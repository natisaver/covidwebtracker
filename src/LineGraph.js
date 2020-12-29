import React, {useState, useEffect} from 'react'
import {Line} from "react-chartjs-2";
import numeral from "numeral";

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

//cases type value is decided by the state in app.js

function LineGraph({ casesType = 'cases'}) {
    const [data, setData] = useState({});

    //updating datapoint for a case type (either case,death or recovered)
    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint; //set it as lastDataPoint

        for(let date in data.cases) {
            if (lastDataPoint) { //it was alr let lastDataPoint
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint //take cases new - old
                }
            chartData.push(newDataPoint); 
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData
    }

    //getting data from api
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
    }, [casesType])

    //color code
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
