import ScatterPlot from "./newGraphComponents/linear_scatter"
import Cubic_Form from "./newGraphComponents/cubic_form"
import { useState, useRef } from 'react'
import QuadraticHelp from "./newGraphComponents/quadratic_help"
import NavBar from './navbar';
import Footer from './footer';
import "./_app.js"


export default function CubicGraphPage({currUser}) {

    const canvasRef = useRef(null)
    

    return(
        <div>
            <NavBar/>
            <h1>Graphr Page</h1>
            <div><Cubic_Form canvasRef = {canvasRef} currUser = {currUser}/></div>
            <div style={{position: 'absolute', top: 80, right: 10}}><QuadraticHelp/></div>
            <Footer/>
        </div>
    )
}