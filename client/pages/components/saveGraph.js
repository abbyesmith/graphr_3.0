import React, {useState} from 'react';
import '../_app.js'

export default function SaveGraph( {newPoints, currUser}) {
    // console.log(newPoints)
    const [type, setType] = useState('Linear');

    const [hw_name, setHwName] = useState('');
    const [problem_name, setProblemName] = useState('');
    const [newStudentGraphID, setNewStudentGraphID] = useState("")
    const [graphID, setGraphID] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault();
        const graphData = {
            "type": type,
            "x_1": newPoints[0].x,
            "y_1": newPoints[0].y,
            "x_2": newPoints[1].x,
            "y_2": newPoints[1].y,
            "x_3": newPoints[2].x,
            "y_3": newPoints[2].y,
            "x_4": newPoints[3].x,
            "y_4": newPoints[3].y,
            "x_5": newPoints[4].x,
            "y_5": newPoints[4].y,
            "hw_name": hw_name,
            "problem_name": problem_name            
        }

        fetch ("/all_graphs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphData),
        })
        .then(r => r.json())
        .then((graphData) => {
            // console.log("success, Graph", graphData.id, currUser.id)
            setGraphID(graphData.id)
            console.log(graphData.id)
            handleSubmit2(graphData.id);
        })
        
    }
    function handleSubmit2(graphID){
        const newStudentGraph = {
            "student_id": currUser.id,
            "graph_id": graphID
        }
        
        fetch("/student_graph", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudentGraph),
        })
        .then(r => r.json())
        .then((newStudentGraph) => {
            setNewStudentGraphID(newStudentGraph.id)
            console.log("Success, StudentGraph", newStudentGraph.id, graphID, currUser.id)
            window.alert("Graph saved successfully!")
        })
    }


    return(
        <div>
            <h3>Save Graph</h3>
            <form onSubmit = {handleSubmit}>
                <p>Homework Name</p>
                <input
                    type = "text"
                    value = {hw_name}
                    onChange = {(e)=>setHwName(e.target.value)}
                />
                <p>Problem Name/Number</p>
                <input
                    type = "text"
                    value = {problem_name}
                    onChange = {(e)=>setProblemName(e.target.value)}
                />
                <p>Function Type</p>
                <select value = {type} onChange = {(e)=>setType(e.target.value)}>
                    <option value = "Linear">Linear</option>
                    <option value = "Quadratic">Quadratic</option>
                </select>
                <button type = "submit">Save Graph</button>

            </form>
        </div>
    )
}