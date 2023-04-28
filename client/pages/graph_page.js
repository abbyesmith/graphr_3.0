import ScatterPlot from "./components/linear_graph"
import Linear_Form from "./components/linear_form"
import { useState } from 'react'
import { UserData } from './fake_data'


export default function GraphPage() {
    console.log('here')
    
    const [userData, setUserData] = useState({
        
        labels: UserData.map((data) => data.year),
        datasets: [{
          label: "Users Lost",
          data: UserData.map((data) => data.userLost),
          backgroundColor: ["#FF9636", "#FF5C4D", "#905FD0"],
          borderColor: "black",
          borderWidth: 1,   
       }],
    
      })

      return(
        <div>
            <h1>Graphr Page</h1>
            <div><Linear_Form/></div>
            {/* <div className = "App" style ={{width: 700}}><ScatterPlot /></div> */}

        </div>
      )
}