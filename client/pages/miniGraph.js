import React, { useState, useEffect } from 'react';
import {Chart as ChartJS} from "chart.js/auto"
import { Line } from 'react-chartjs-2'

export default function MiniGraphs({graph_id}){

    const [miniGraph, setMiniGraph] = useState([])

    useEffect(() => {
        getGraphs();
    },[graph_id])
    
    // This will need to change!!!! 89 is just for testing purposes
    // const id = userGraphs.graph_id

    // console.log(userGraphs.graph_id)
    // const id = userGraphs.map(student_graph => (
    //     console.log(student_graph.graph_id)
    // ))
    const getGraphs = () => {
        fetch (`/graph_by_id/${graph_id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(r => r.json())
        .then((info) => {
            setMiniGraph(info);
            console.log(info)
            console.log(info[0].a)
            console.log(typeof(info[0].a))
        })
        .catch((error) => console.error(error))
    }
    // const equation = info[0].equation
    // console.log(equation)
    const a = miniGraph[0]?.a
    const b = miniGraph[0]?.b

    const data = {
        labels: [],
        datasets: [
            {
                // label: 'Linear Graph',
                data: [],
                fill: false,
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0,
            },
        ]
    }
    for (let i = -10; i<=10; i++){
        data.labels.push(i);
        data.datasets[0].data.push( (i))
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
    const yValues = [];
    for (let x = -10; x<=10; x++){
        // This will need to be an if/else based on the type of equation
        yValues.push(a * x + b);
    }

    data.datasets.push({
        // This will need to be an if/else based on the type of equation
        label: `y = ${a}x + ${b}`,
        data: yValues,
        fill: false,
        borderColor: 'blue',
        borderWidth: 1,
    });
    


    return(
        <div>
            <p>{`Assignment: ${miniGraph[0]?.hw_name}`}</p>
            <p>{`Problem: ${miniGraph[0]?.problem_name}`}</p>
            <Line data = {data} options={options}/>
        </div>
    )

}