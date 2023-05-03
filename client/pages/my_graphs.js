import React from 'react';
import NavBar from './navbar';
import './_app.js'


export default function MyGraphs({currUser}){
    // include this when you are using currUser 
    if (!currUser){
        return(
            <div>
                Loading
            </div>
        )
    }

    // const fetchGraphs = ()


    
    return(
        <div>
            <NavBar/>
            <h1>{`Hi ${currUser.username}!`}</h1>
            <h2>my Graphs</h2>

        </div>    )
}