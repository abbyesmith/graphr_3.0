import { useState, useRef } from 'react';
import ScatterPlot from './linear_scatter';
import {Chart as ChartJS} from "chart.js/auto"
import { Line } from 'react-chartjs-2'
import LineChart from './lineChart';
import SaveGraph from './saveGraph'
import html2canvas from 'html2canvas'
// import './_app.js'



export default function Linear_Form( {currUser}) {
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

    const [lobf, setLOBF] = useState("")

    const [a, setA] = useState("")
    const [b, setB] = useState("")

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
    
    const calculateLOBF = (points) => {
        const n = points.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        
        for (let i = 0; i < points.length; i++) {
            const x = points[i].x;
            const y = points[i].y;
            
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x * x;
        }
        
        const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        console.log(a)
        setA(a)
        const b = (sumY - a * sumX) / n;
        setB(b)
        console.log(b)

        let tss = 0, rss = 0, yMean = sumY / n;
        for (let i = 0; i < points.length; i++){
            const y = points[i].y;
            const yPredicted = a * points[i].x + b;
            tss += (y - yMean) ** 2;
            rss += (y - yPredicted) ** 2;
        }

        const rSquared = 1 - (rss / tss)
        
        const equation = (x) => `${a.toFixed(2)}x + ${b.toFixed(2)}`

            
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
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
        }
            
        return {
            equation: `y = ${a.toFixed(2)}x + ${b.toFixed(2)}`,
            rSquared: rSquared.toFixed(4),
            data: data,
            options: options
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const lobf = calculateLOBF(points)
        console.log(lobf.data)

        setLOBF(lobf)
        console.log(lobf);
        console.log(a, b)
    };

    const Plot = ({lobf, points, newPoints})=>{
        if (!lobf) {
            return <ScatterPlot points={points}/>;
        } else if (lobf.rSquared === '1.0000') {
            console.log(a)
            return (
                <div>
                    <div id = "capture">                    
                        <LineChart  data = {lobf.data} options = {lobf.data} lineEquation={lobf.equation} a = {a} b = {b}/>,
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
                    <SaveGraph newPoints = {points} currUser={currUser} equation = {lobf.equation} a = {a} b ={b}/>
                </div>
            )

        } else {
            return (
                <div>
                    <ScatterPlot points = {points} />
                    <p>Your points do not form a linear function. Check the Need Help button for additional resources on graphing linear functions</p>
                </div>
            )
        }
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {[0, 1, 2, 3, 4].map((index) => (
                <div key={index}>
                    <label>
                    Point {index + 1}: (
                    <input name="x" type="number" onChange={(e) => handleChange(e, index)} style={{ width: 30 }}/>
                    ,
                    <input name="y" type="number" onChange={(e) => handleChange(e, index)} style={{ width: 30 }}/>
                    )
                    </label>
                </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            <div >
                {Plot({lobf, points, a, b})}
                <canvas ref = {canvasRef} />
            </div>
        </div>
    );
}