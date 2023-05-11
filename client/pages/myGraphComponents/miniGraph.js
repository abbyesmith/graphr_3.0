import React, { useState, useEffect } from 'react';
import {Chart as ChartJS} from "chart.js/auto"
import { Line } from 'react-chartjs-2'

export default function MiniGraphs({graph_id, student_graph_id}){

    const [miniGraph, setMiniGraph] = useState([])

    useEffect(() => {
        getGraphs();
    },[graph_id])

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

    const deleteOneGraph = () => {
        fetch(`/one_student_graph/${student_graph_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        window.location.reload();
    }

    const a = miniGraph[0]?.a;
    const b = miniGraph[0]?.b
    const c = miniGraph[0]?.c
    const type = miniGraph[0]?.type

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
                        min: -10,
                        max: 10,
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        min: -10,
                        max: 10,
                    },
                },
            ],
        },
    }
    const yValues = [];
    for (let x = -10; x<=10; x++){
        // This will need to be an if/else based on the type of equation
        if (type === 'Linear'){
            yValues.push(a * x + b);
        } else if (type ==='Quadratic'){
            yValues.push(a*x**2 + b*x + c);
        }
    }

    // if miniGraph.type === "Linear"{
    // }
    // ;
    if (type === 'Linear'){
        data.datasets.push({
        label: `y = ${a}x + ${b}`,
        data: yValues,
        fill: false,
        borderColor: 'blue',
        borderWidth: 1,
        })
    } else if (type === 'Quadratic'){
        data.datasets.push({
            label: `y = ${a.toFixed(2)}x^2 + ${b.toFixed(2)}x + ${c}`,
            data: yValues,
            fill: false,
            borderColor: 'blue',
            borderWidth: 1,
            })
    }
    


    return(
        <div className = "miniGraphCard">
            <p>{`Assignment: ${miniGraph[0]?.hw_name}`}</p>
            <p>{`Problem: ${miniGraph[0]?.problem_name}`}</p>
            <p>{`${miniGraph[0]?.type} Function`}</p>
            <Line data = {data} options={options}/>
            <button onClick = {deleteOneGraph} classnName = 'trashbtn'>🗑️</button>
        </div>
    )

}