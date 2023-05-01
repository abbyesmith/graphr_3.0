import React, { useEffect, useRef } from "react";
import { Scatter } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"

export default function FakeScatterPlot(props){

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
                      
        }, {
          label: 'Linear Function',
          data: points.map((point) => ({x: point.x, y: point.y})),            
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',

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
// The copyChartToClipboard function is broken. Chat with Sam or David
    useEffect(() => {
        const copyButton = document.querySelector("#copy-button");
        copyButton.addEventListener("click", copyChartToClipboard);
        
        function copyChartToClipboard() {
            // Get the chart canvas element
            setTimeout(() => {
                const chartCanvas = document.querySelector("#scatterPlot canvas"), width = 700;
                if (!chartCanvas) {
                    console.log("canvas not found!");
                    return;
                }
    
                // Create a new canvas element to copy the chart image to
                const copyCanvas = document.createElement("canvas");
                copyCanvas.width = chartCanvas.width;
                copyCanvas.height = chartCanvas.height;
              
                // Copy the chart image to the new canvas element
                const copyContext = copyCanvas.getContext("2d");
                copyContext.drawImage(chartCanvas, 0, 0);
              
                // Use the Clipboard API to copy the image to the clipboard
                copyCanvas.toBlob(function(blob) {
                  const item = new ClipboardItem({'image/png': blob});
                  navigator.clipboard.write([item]);
                });
            }, 100);
        }
    }, []);

    return (
        <div style = {{width: 700}}>
            <Scatter id="scatterPlot" data={data} options={options} />
            <button id="copy-button">Copy to Clipboard</button>
        </div>
    );
}