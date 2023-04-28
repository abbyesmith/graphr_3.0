import ScatterPlot from "./components/linear_graph"
import Linear_Form from "./components/linear_form"
import { useState } from 'react'
import { UserData } from './fake_data'
import LinearHelp from "./components/linear_help"


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
            <div><LinearHelp/></div>
            <iframe width="420" height="315"
                                src="https://youtu.be/6CFE60iP2Ug">
                                </iframe>
        </div>
      )
}