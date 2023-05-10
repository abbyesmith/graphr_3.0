import React from 'react';
import { Line } from 'react-chartjs-2';

const CubicChart = ({ data, options, lineEquation, a, b, c, d}) => {
    const yValues = [];
    console.log(a)
    console.log(b)
    for (let x = -10; x <= 10; x++) {
        yValues.push(d * x**3 + c * x**2 + b * x + a);
    }

    data.datasets.push({
        label: `y = ${d}x^3 + ${c}x^2 + ${b}x + ${a}`,
        data: yValues,
        fill: false,
        borderColor: 'blue',
        borderWidth: 1,
    });

    return (
        <div>
            <Line data={data} options={options}/>
            <div> Cubic of Best Fit: {lineEquation}</div>
        </div>

    );
}

export default CubicChart;