import React from 'react';
import Link from 'next/link'; 
import NavBar from './navbar';
import './_app.js'
import Footer from './footer';

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
            <h1>{`Welcome to Graphr ${currUser.username}!`}</h1>
            <h2>Graphr is a new site that helps students complete traditional graphing worksheets in a digital space</h2>
            <Footer />
        </div>
    )
}