import React from "react";
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"

export default function BarChart({chartData}) {
    console.log(chartData)
    return (
        <div>
            <p>test</p>
            {/* <div style = {{width: 700}}>
                <Bar data = {chartData} />
            </div>
             */}
            
        </div>
    )

}
