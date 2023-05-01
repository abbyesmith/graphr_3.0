import React from 'react';
import Link from 'next/link'; 
import NavBar from './navbar';
import './_app.js'


export default function Home ({currUser}) {
    // use this when you are using currUser 
    if (!currUser){
        return(
            <div>
                Loading
            </div>
        )
    }
    return (
        <div>
            <NavBar/>
            <h1>{`Hi ${currUser.username}!`}</h1>
            <h2>sup</h2>

        </div>
    )
}