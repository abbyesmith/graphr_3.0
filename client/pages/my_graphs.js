import React, {useState, useEffect} from 'react';
import NavBar from './navbar';
import './_app.js'
import MiniGraphs from './myGraphComponents/miniGraph';
import Footer from './footer'


export default function MyGraphs({currUser}){
    // include this when you are using currUser 
    if (!currUser){
        return(
            <div>
                Loading
            </div>
        )
    }

    const [userGraphs, setUserGraphs]=useState([]);

    useEffect(()=>{
        fetchGraphs();
    }, [])
    const fetchGraphs = () => {
        fetch (`/graph_by_student_id/${currUser.id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(r => r.json())
        .then((data) => {
            setUserGraphs(data);
            console.log(data)
        })
        .catch((error)=> console.error(error));
    }

    console.log(userGraphs)
    
    return(
        <div>
            <NavBar/>
            <h1>{`${currUser.username}'s Graphs`}</h1>
            <div className="mini-graph-container">
                {userGraphs.map(student_graph => (
                    <MiniGraphs key = {student_graph.graph_id} graph_id = {student_graph.graph_id } student_graph_id = {student_graph.id} />
                ))}
            </div>
            <Footer />
        </div>    
    )
}