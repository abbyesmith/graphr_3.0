import { useState, useRef } from 'react';
import ScatterPlot from './linear_scatter';
import {Chart as ChartJS} from "chart.js/auto"
import { Line } from 'react-chartjs-2'
import QuadraticChart from './quadraticChart';
import SaveGraph from './saveGraph'
import html2canvas from 'html2canvas'
// import './_app.js'



export default function Quadratic_Form( {currUser}) {
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

    const [qobf, setQOBF] = useState("")

    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [c, setC] = useState("")
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
    
    const calculateQOBF = (points) => {
        const n = points.length;
        console.log(n)
        let y = [];
        let x = [];
        let xSum = 0;
        let xAvg = 0;

        let ySum = 0;
        let yAvg = 0;

        let x2Sum = 0;
        let x2Avg = 0;

        let sxx = 0;
        let sxx2 = 0;
        let sx2x2 = 0;

        let sxy = 0;
        let sx2y = 0;
        
        //Calculate the sums of x, y, x^2, x^3, x^4, and x^2y:
        for (let i = 0; i <= 4; i++) {
            x.push(points[i].x);
            // console.log(x)
            y.push(points[i].y);
            // console.log(y)

            xSum += x[i];
                console.log(xSum)
            xAvg = xSum/points.length;
                console.log(xAvg)
            ySum += y[i];
                console.log(ySum)
            yAvg = ySum/points.length;
                console.log(yAvg)
            x2Sum += x[i]* x[i]
                console.log(x2Sum)
            x2Avg = x2Sum/5;
                console.log(x2Avg)
            sxx = (x[0]-xAvg)**2 + (x[1]-xAvg)**2+ (x[2]-xAvg)**2 + (x[3]-xAvg)**2 + (x[4]-xAvg)**2 ;
                console.log(sxx)
            sxy = (x[0]-xAvg)*(y[0]-yAvg) + (x[1]-xAvg)*(y[1]-yAvg) + (x[2]-xAvg)*(y[2]-yAvg) + (x[3]-xAvg)*(y[3]-yAvg) + (x[4]-xAvg)*(y[4]-yAvg);
                console.log(sxy)
            sxx2 = (x[0]-xAvg)*(x[0]**2-x2Avg) + (x[1]-xAvg)*(x[1]**2-x2Avg) + (x[2]-xAvg)*(x[2]**2-x2Avg) + (x[3]-xAvg)*(x[3]**2-x2Avg) + (x[4]-xAvg)*(x[4]**2-x2Avg)
                console.log(sxx2)
            sx2x2 = (x[0]**2-x2Avg)*(x[0]**2-x2Avg) + (x[1]**2-x2Avg)*(x[1]**2-x2Avg) + (x[2]**2-x2Avg)*(x[2]**2-x2Avg) + (x[3]**2-x2Avg)*(x[3]**2-x2Avg) + (x[4]**2-x2Avg)*(x[4]**2-x2Avg)
                console.log(sx2x2)
            sx2y = (x[0]**2-x2Avg)*(y[0]-yAvg) + (x[1]**2-x2Avg)*(y[1]-yAvg) + (x[2]**2-x2Avg)*(y[2]-yAvg) + (x[3]**2-x2Avg)*(y[3]-yAvg) + (x[4]**2-x2Avg)*(y[4]-yAvg);
                console.log(sx2y)
        }

        let b = ((sxy * sx2x2 - sx2y * sxx2) / (sxx * sx2x2 - (sxx2)**2))
            console.log(b)
            setB(b)
        
        let a = ((sx2y * sxx - sxy * sxx2) / (sxx * sx2x2  - (sxx2)**2))
            console.log(a)
            setA(a)

        let c = yAvg - b * xAvg - a * x2Avg
            console.log(c)
            setC(c)
        // Calculate rSquared
        let tss = y.reduce((sum, value) => sum + (value - yAvg) ** 2, 0);
        let sse = 0

        for (let i = 0; i < points.length; i++){
            let predictedY = a *x[i]**2 + b*x[i] + c;
            sse += (y[i] - predictedY)**2
        }

        const rSquared = 1 - (sse / tss)
        
        const equation = (x) => `${a.toFixed(2)}x**2 + ${b.toFixed(2)}x + ${c}}`
            
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
            equation: `${a.toFixed(2)}x**2 + ${b.toFixed(2)}x + ${c}}`,
            rSquared: rSquared.toFixed(4),
            data: data,
            options: options
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const qobf = calculateQOBF(points)
        console.log(qobf.data)

        setQOBF(qobf)
        console.log(qobf);
        console.log(a, b, c)
    };

    const Plot = ({qobf, points, newPoints})=>{
        if (!qobf) {
            return <ScatterPlot points={points}/>;
        } else if (qobf.rSquared === '1.0000') {
            console.log(a)
            return (
                <div>
                    <div id = "capture" style = {{width: 700}}>                    
                        <QuadraticChart  data = {qobf.data} options = {qobf.options} lineEquation={qobf.equation} a = {a} b = {b} c = {c}/>,
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
                    <SaveGraph newPoints = {points} currUser={currUser} equation = {qobf.equation} a = {a} b ={b} c = {c}/>
                </div>
            )

        } else {
            return (
                <div>
                    <ScatterPlot points = {points} />
                    <p>Your points do not form a quadratic function. Check the Need Help button for additional resources on graphing quadratic functions</p>
                </div>
            )
        }
    }
    

    return (
        <div>
            <h3>Quadratic Points</h3>
            <form onSubmit={handleSubmit}>
                {[0, 1, 2, 3, 4].map((index) => (
                <div key={index}>
                    <label>
                    Point {index + 1}: (
                    <input name="x" type="number" step="0.01" onChange={(e) => handleChange(e, index)} style={{ width: 40 }}/>
                    ,
                    <input name="y" type="number" step = "0.01" onChange={(e) => handleChange(e, index)} style={{ width: 40 }}/>
                    )
                    </label>
                </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            <div >
                {Plot({qobf, points, a, b})}
                <canvas ref = {canvasRef} />
            </div>
        </div>
    );
}