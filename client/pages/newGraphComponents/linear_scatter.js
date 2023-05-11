
import React, { useEffect, useRef } from "react";
import { Scatter } from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"

export default function ScatterPlot(props){

    const { points } = props
    const canvasRef = useRef(null);

    
    const data = {
        datasets: [{
            label: 'Points you Plotted',
            data: points.map((point) => ({x: point.x, y: point.y})),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 8,
                      
        }]
    }

    const options = {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
              stepSize: 1,
              min: -10,
              max: 10,
            },
            grid: {
              display: true,
              color: 'grey',
              borderWidth: 6, //this makes the x-axis bold
            }
          },
          y: {
            type: 'linear',
            ticks: {
              stepSize: 1,
              min: -10,
              max: 10,
            },
            grid: {
              display: true,
              color: 'grey',
              borderWidth: 9, //the makes the y-axis bold
            }
          }
        }
    };


    return (
        <div style = {{width: 700}}>
            <Scatter id="scatterPlot" data={data} options={options} />
            {/* <button id="copy-button">Copy to Clipboard</button> */}
        </div>
    );
}
