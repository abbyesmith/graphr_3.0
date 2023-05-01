

import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, options, lineEquation, slope, intercept }) => {
  const yValues = [];
  console.log(slope)
  console.log(intercept)
  for (let x = -10; x <= 10; x++) {
    yValues.push(slope * x + intercept);
  }

  data.datasets.push({
    label: `y = ${slope}x + ${intercept}`,
    data: yValues,
    fill: false,
    borderColor: 'blue',
    borderWidth: 1,
  });

  return (
    <div>
      <Line data={data} options={options}/>
      <div> Line of Best Fit: {lineEquation}</div>
    </div>

  );
}

export default LineChart;