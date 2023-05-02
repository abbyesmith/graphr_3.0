import { useState, useRef } from 'react';
import ScatterPlot from './linear_scatter';
import {Chart as ChartJS} from "chart.js/auto"
import { Line } from 'react-chartjs-2'
import LineChart from './lineChart';
import CopyToClipboardButton from './copy_to_clipboard';
import SaveGraph from './saveGraph'
// import './_app.js'



export default function Linear_Form() {
    const canvasRef = useRef(null);
    const handleCopyClick = () => {
        const canvas = canvasRef.current;
        // const dataURL = canvas.toDataURL();
        // CopyToClipboardButton({text: dataURL })
        CopyToClipboardButton({canvasRef})
    }

    const [points, setPoints] = useState([{x:0,y:0},{x:null,y:null},{x:null,y:null},{x:null,y:null},{x:null,y:null}]);

    const [lobf, setLOBF] = useState("")

    const [slope, setSlope] = useState("")
    const [intercept, setIntercept] = useState("")

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
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        console.log(slope)
        setSlope(slope)
        const intercept = (sumY - slope * sumX) / n;
        setIntercept(intercept)
        console.log(intercept)

        let tss = 0, rss = 0, yMean = sumY / n;
        for (let i = 0; i < points.length; i++){
            const y = points[i].y;
            const yPredicted = slope * points[i].x + intercept;
            tss += (y - yMean) ** 2;
            rss += (y - yPredicted) ** 2;
        }

        const rSquared = 1 - (rss / tss)
        
        const equation = (x) => `${slope.toFixed(2)}x + ${intercept.toFixed(2)}`
            
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
            equation: `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`,
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
    };

    const Plot = ({lobf, points, slope, intercept, newPoints})=>{
        if (!lobf) {
            return <ScatterPlot points={points}/>;
        } else if (lobf.rSquared === '1.0000') {
            return (
                <div>
                    <LineChart data = {lobf.data} options = {lobf.data} lineEquation={lobf.equation} slope = {slope} intercept = {intercept}/>,
                    <SaveGraph newPoints = {points}/>

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
      <div>
        {Plot({lobf, points, slope, intercept})}
        <canvas ref = {canvasRef} />
        {/* <button onClick = {handleCopyClick}>Copy Graph</button> */}
        < CopyToClipboardButton canvasRef = {canvasRef}/>
      </div>

    </div>
  );
}