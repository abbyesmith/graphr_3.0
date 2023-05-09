
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, options, lineEquation, a, b, c }) => {
    const yValues = [];
    console.log(a)
    console.log(b)
    console.log(c)
    for (let x = -10; x <= 10; x++) {
        yValues.push(a * x * x + b * x + c);
    }

    data.datasets.push({
        label: `y = ${a}x^2 + ${b}*x + ${c}`,
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