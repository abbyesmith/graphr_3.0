import ScatterPlot from "./newGraphComponents/linear_scatter"
import Linear_Form from "./newGraphComponents/linear_form"
import { useState, useRef } from 'react'
import { UserData } from './fake_data'
import LinearHelp from "./newGraphComponents/linear_help"
import NavBar from './navbar';
import "./_app.js"


export default function GraphPage({currUser}) {
    // console.log(currUser)

    const canvasRef = useRef(null)
    
    // const [userData, setUserData] = useState({
        
    //     labels: UserData.map((data) => data.year),
    //     datasets: [{
    //       label: "Users Lost",
    //       data: UserData.map((data) => data.userLost),
    //       backgroundColor: ["#FF9636", "#FF5C4D", "#905FD0"],
    //       borderColor: "black",
    //       borderWidth: 1,   
    //    }],
    
    //   })



      return(
        <div>
            <NavBar/>

            <h1>Graphr Page</h1>
            <div><Linear_Form canvasRef = {canvasRef} currUser = {currUser}/></div>
            <canvas ref = {canvasRef}/>
            {/* <div className = "App" style ={{width: 700}}><ScatterPlot /></div> */}
            <div><LinearHelp/></div>
        </div>
      )
}