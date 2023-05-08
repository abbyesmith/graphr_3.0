import React, { useEffect, useRef } from "react";
import { Scatter } from 'react-chartjs-2'


export default function ScatterPlot(props){

  const { points } = props

  const data = {
      datasets: [{
          label: 'Points you Plotted',
          data: points.map(point => ({ x: point.x, y: point.y })),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          pointRadius: 5,
          pointHoverRadius: 8,
      }]
  };

  const options = {
    aspectRatio: 1,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: false,
          // stepSize: 1,
          fontColor: 'black',
          fontWeight: 'bold',
          min: -10,
          max: 10
        },
        scaleLabel: {
          display: true,
          labelString: 'X Axis',
          fontColor: 'black',
          fontWeight: 'bold'
        },
        gridLines: {
          color: 'grey',
          zeroLineColor: 'grey',
          lineWidth: 2,
          drawTicks: true,
          drawOnChartArea: true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false,
          // stepSize: 1,
          fontColor: 'black',
          fontWeight: 'bold',
          min: -10,
          max: 10
        },
        scaleLabel: {
          display: true,
          labelString: 'Y Axis Label',
          fontColor: 'black',
          fontWeight: 'bold'
        },
        gridLines: {
          color: 'grey',
          zeroLineColor: 'grey',
          lineWidth: 2,
          drawTicks: true,
          drawOnChartArea: true
        }
      }]
    }
  };

  return (
    <div style = {{width: 500}}>
      <Scatter id="scatterPlot" data={data} options={options} />
    </div>
  );
}