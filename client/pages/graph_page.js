import ScatterPlot from "./newGraphComponents/linear_scatter"
import Linear_Form from "./newGraphComponents/linear_form"
import { useState, useRef } from 'react'
import { UserData } from './fake_data'
import LinearHelp from "./newGraphComponents/linear_help"
import NavBar from './navbar';
import "./_app.js"


export default function GraphPage({currUser}) {

    const canvasRef = useRef(null)
    

      return(
        <div>
            <NavBar/>

            <h1>Graphr Page</h1>
            <div><Linear_Form canvasRef = {canvasRef} currUser = {currUser}/></div>
            <canvas ref = {canvasRef}/>
            <div><LinearHelp/></div>
        </div>
      )
}