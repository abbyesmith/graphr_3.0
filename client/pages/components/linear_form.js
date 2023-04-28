import { useState } from 'react';
import ScatterPlot from './linear_graph';


export default function Linear_Form() {
  const [points, setPoints] = useState([{x:null,y:null},{x:null,y:null},{x:null,y:null},{x:null,y:null},{x:null,y:null}]);

  
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
        const intercept = (sumY - slope * sumX) / n;
        // console.log(slope)
        return {
            equation: `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`,
            rSquared: `TBD`
        }
            
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      const lobf = calculateLOBF(points)
      console.log(lobf);
    };


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
      <ScatterPlot points={points} />
      {/* <p>`Line of best fit: {CalculateLOBF}`</p> */}
    </div>
  );
}


