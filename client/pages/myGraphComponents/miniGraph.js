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


    const [isEditing, setIsEditing] = useState(false);
    const [updateGraph, setUpdateGraph] = useState({
        hw_name: graph_id.hw_name,
        problem_name: graph_id.problem_name,
        type: graph_id.type
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateGraph((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleEditGraph = () => {
        setIsEditing(true);
    };

    const handleSaveGraph = async () => {
        const response = await fetch(`/graph_by_id/${graph_id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateGraph)
        })
        setIsEditing(false);
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
        aspectRatio: 1,
            scales: {
                xAxes: [{
                    ticks: {
                    min: -10,
                    max: 10,
                    },
                }],
                yAxes: [{
                    ticks: {
                    min: -10,
                    max: 10,
                    },
                }],
            },
        };
    
    const yValues = [];
    for (let x = -10; x<=10; x++){
        if (type === 'Linear'){
            yValues.push(a * x + b);
        } else if (type ==='Quadratic'){
            yValues.push(a*x**2 + b*x + c);
        }
    }


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
            {isEditing ? (
                <div>
                <div>
                    <p>{`Assignment: ${miniGraph[0]?.hw_name}`}</p>
                    <p>{`Problem: ${miniGraph[0]?.problem_name}`}</p>
                    <p>{`${miniGraph[0]?.type} Function`}</p>
                    <Line data = {data} options={options}/>
                    <button onClick = {deleteOneGraph} className = 'trashbtn'>🗑️</button>
                    <button className='editbtn' onClick={handleEditGraph}>✏️</button>
                </div>
                <form>
                    <label>
                        Homework Name:
                        <input
                        type="text"
                        name="hw_name"
                        value={updateGraph.hw_name}
                        onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Problem Name:
                        <input
                        type="text"
                        name="problem_name"
                        value={updateGraph.problem_name}
                        onChange={handleInputChange}
                        />
                    </label>
                    <label>
                    Function Type:
                        <input
                        type="text"
                        name="type"
                        value={updateGraph.problem_name}
                        onChange={handleInputChange}
                        />
                    </label>
                    <button type="button" onClick={handleSaveGraph}>Save</button>
                </form>
                </div>
            ) : (
                <div>
                    <p>{`Assignment: ${miniGraph[0]?.hw_name}`}</p>
                    <p>{`Problem: ${miniGraph[0]?.problem_name}`}</p>
                    <p>{`${miniGraph[0]?.type} Function`}</p>
                    <Line data = {data} options={options}/>
                    <button onClick = {deleteOneGraph} className = 'trashbtn'>🗑️</button>
                    <button className='editbtn' onClick={handleEditGraph}>✏️</button>
                </div>)}
        </div>
            
    )
}