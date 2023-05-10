import { useState, useRef, useEffect } from 'react';
import ScatterPlot from './linear_scatter';
import {Chart as ChartJS} from "chart.js/auto"
import { Line } from 'react-chartjs-2'
import CubicChart from './cubicChart';
import SaveGraph from './saveGraph'
import html2canvas from 'html2canvas'
const math = require('mathjs');

// import './_app.js'



export default function Cubic_Form( {currUser}) {
    const canvasRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);


    function copyToClipboard(dataUrl) {
        const blob = new Blob([dataUrl], { type: "image/png; charset=utf-8" });
        const item = new ClipboardItem({ "image/png": blob });

        navigator.clipboard.write([item]).then(function() {
            console.log("Copied to clipboard!");
        }, function(error) {
            console.error("Failed to copy image to clipboard", error);
        });
    }
    
    
    function capture() {
        html2canvas(document.querySelector("#capture")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const uintArray = new Uint8Array(atob(imgData.split(',')[1]).split('').map(char => char.charCodeAt()));
            const blob = new Blob([uintArray], { type: 'image/png' });
            navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob })
            ]).then(() => {
                console.log('Image copied to clipboard');
                setShowPopup(true);
            }).catch(err => {
                console.error('Failed to copy image to clipboard:', err);
            });
        });
    }

    function handlePopupClose() {
        setShowPopup(false)
    }

    const [points, setPoints] = useState([{x:0,y:0},{x:null,y:null},{x:null,y:null},{x:null,y:null},{x:null,y:null}]);

    const [cobf, setCOBF] = useState("")

    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [c, setC] = useState("")
    const [d, setD] = useState("")
    const [det, setDet] = useState("")

    const handleChange = (e, index) => {
        const { name, value } = e.target; 
        setPoints (prevPoints => {
            const newPoints = [...prevPoints];
            const point = newPoints[index];
            console.log(newPoints)
            point[name] = Number(value);
            newPoints[index] = point; 
            return newPoints;
        })
    };
    
    const calculateCOBF = (points) => {
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
        // const [setA, setB, setC, setD] = coefficients.map((x) => x[0]);
          // Extract the coefficients from the result
        const a = coefficients[0][0];
        const b = coefficients[1][0];
        const c = coefficients[2][0];
        const d = coefficients[3][0];
    
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
        
        const equation = (x) => `${d.toFixed(2)}x**3 + ${c.toFixed(2)}x**2 + ${b.toFixed(2)}x + ${a}`
            
        const data = {
            labels: [],
            datasets: [
                {
                    // label: 'Linear Graph',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 0,
                },
                {
                    label: "Points", 
                    data: points,
                    pointBackgroundColor: "rgba(54, 162, 235, 1)",
                    pointBorderColor: "#fff",
                    pointBorderWidth: 1,
                    pointRadius: 8,
                    pointHoverRadius: 11,

                }
            ]
        }
        for (let i = -10; i<=10; i++){
            data.labels.push(i);
            data.datasets[0].data.push(equation (i))
        }
        const options = {
            aspectRatio: 1,
            // scales: {
            //     xAxes: [
            //         {
            //             ticks: {
            //                 beginAtZero: false,
            //                 fontColor: 'black',
            //                 fontWeight: 'bold'
            //             },
            //             scaleLabel: {
            //                 display: true,
            //                 labelString: 'X Axis Label',
            //                 fontColor: 'black',
            //                 fontWeight: 'bold'
            //             }
            //         },
            //     ],
            //     yAxes: [
            //         {
            //             ticks: {
            //                 beginAtZero: false,
            //                 fontColor: 'black',
            //                 fontWeight: 'bold'
            //             },
            //             scaleLabel: {
            //                 display: true,
            //                 labelString: 'Y Axis Label',
            //                 fontColor: 'black',
            //                 fontWeight: 'bold'
            //             }
            //         },
            //     ],
            // },
        };
            
        return {
            equation: `${d.toFixed(2)}x**3 + ${c.toFixed(2)}x**2 + ${b.toFixed(2)}x + ${a}}`,
            rSquared: rSquared.toFixed(4),
            data: data,
            options: options
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const cobf = calculateCOBF(points)
        console.log(cobf.data)

        setCOBF(cobf)
        console.log(cobf);
        console.log(a, b, c, d)
    };

    function clearBtn(){
        var element = document.getElementById("pointsForm");
            element.reset()
    }
    const Plot = ({qobf, points, newPoints})=>{
        if (!qobf) {
            return <ScatterPlot points={points}/>;
        } else if (qobf.rSquared === '1.0000') {
            console.log(a)
            return (
                <div>
                    <div id = "capture" style = {{width: 700}}>                    
                        <CubicChart  data = {qobf.data} options = {qobf.options} lineEquation={qobf.equation} a = {a} b = {b} c = {c} d = {d}/>,
                    </div>
                    <button onClick = {capture}>Take a screenshot</button>
                    {showPopup && (
                        <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                        onClick={handlePopupClose}
                        >
                            <div
                                style={{
                                backgroundColor: 'white',
                                padding: 16,
                                borderRadius: 8,
                                }}
                                onClick={(event) => {
                                event.stopPropagation();
                                }}
                            >
                                <h2>Success, the image is saved to your clipboard. Now head over to the document you'd like to post your image.</h2>
                                <div id="result"></div>
                                <button onClick={handlePopupClose}>Close</button>
                            </div>
                        </div>
                    )}
                    <Practice points = {points}/>
                    <SaveGraph newPoints = {points} currUser={currUser} equation = {qobf.equation} a = {a} b ={b} c = {c} d = {d}/>
                </div>
            )

        } else {
            return (
                <div>
                    <ScatterPlot points = {points} />
                    <p>Your points do not form a cubic function. Check the Need Help button for additional resources on graphing quadratic functions</p>
                </div>
            )
        }
    }
    

    return (
        <div>
            <h3>Cubic Points</h3>
            <form onSubmit={handleSubmit} id = "pointsForm" className = "pointsForm" autocomplete="off">
                {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className='inputField'>
                    <label>
                    Point {index + 1}: (
                    <input name="x" type="number" step="0.01" onChange={(e) => handleChange(e, index)} style={{ width: 40 }} className = "xValue" required/>
                    ,
                    <input name="y" type="number" step = "0.01" onChange={(e) => handleChange(e, index)} style={{ width: 40 }} className = "yValue" required/>
                    )
                    </label>
                </div>
                ))}
                <span className = "form-btns">
                    <button type="submit"  className="submitBtn">Submit</button>
                    <button type="button" onClick = {clearBtn}>Clear Form</button>
                </span>
            </form>
            <div >
                {Plot({cobf, points, a, b, c, d})}
                <canvas ref = {canvasRef} />
            </div>
        </div>
    );
}