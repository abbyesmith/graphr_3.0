import React from 'react'
const math = require('mathjs');


const practice = () => {
    // Define the five points as arrays of [x, y] values
    const points = [[-2,-7], [-1,3], [0,3], [1,5], [2,21]];

    // Define the number of points
    const n = points.length;

    // Define the X and Y matrices
    const X = Array.from({ length: n }, () => Array.from({ length: 4 }));
    const Y = Array.from({ length: n }, () => []);

    for (let i = 0; i < n; i++) {
        const x = points[i][0];
        const y = points[i][1];
        X[i] = [1, x, x ** 2, x ** 3];
        Y[i] = [y];
    }

    console.log(X)

    // Use linear algebra to solve for the coefficients of the cubic regression equation
    const Xtranspose = math.transpose(X);
    const XtransposeX = math.multiply(Xtranspose, X);
    const XtransposeY = math.multiply(Xtranspose, Y);
    const coefficients = math.multiply(math.inv(XtransposeX), XtransposeY);

    // Extract the coefficients from the result
    const [a, b, c, d] = coefficients.map((x) => x[0]);

    // Print the coefficients of the cubic regression equation
    console.log(`a = ${a.toFixed(2)}`);
    console.log(`b = ${b.toFixed(2)}`);
    console.log(`c = ${c.toFixed(2)}`);
    console.log(`d = ${d.toFixed(2)}`);

    // Use the coefficients to calculate the value of y for a given value of x
    const x = 3;
    const y = a + b * x + c * x ** 2 + d * x ** 3;
    console.log(`y = ${y}`);

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    for (let i = 0; i < points.length; i++) {
        const x = points[i][0];
        const y = points[i][1];
        
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    }

    const yMean = sumY / n;
    const tss = points.reduce((acc, point) => {
        const y = point[1];
        return acc + (y - yMean) ** 2;
    }, 0);
    const rss = points.reduce((acc, point) => {
        const y = point[1];
        const yPredicted = a + b * point[0] + c * point[0] ** 2 + d * point[0] ** 3;
        return acc + (y - yPredicted) ** 2;
    }, 0);

    const rSquared = 1 - (rss / tss);
    console.log(`r^2 = ${rSquared.toFixed(2)}`);


    return (
        <div>practice</div>
    ) 
}

export default practice