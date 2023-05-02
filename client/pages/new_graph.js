import React from 'react';
import Link from 'next/link'; 
import NavBar from './navbar';
import './_app.js'


export default function NewGraph ({currUser}) {
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
            <h1>{`Let's get graphing ${currUser.username}!`}</h1>
            <h2>What type of function are your graphing?</h2>
            <ul>
                <li>
                    <Link href = "/graph_page">Linear Function</Link>
                    <span class="tooltip"> ❓ 
                        <span class="tooltiptext">Linear function description blah blah</span>
                    </span>
                </li>
                <li>
                    <Link href = "/graph_page">Quadratic Function</Link>
                    <span class="tooltip"> ❓ 
                        <span class="tooltiptext">Quadratic function description blah blah</span>
                    </span>
                </li>
                <li>
                    <Link href = "/graph_page">Absolute Value Function</Link>
                    <span class="tooltip"> ❓ 
                        <span class="tooltiptext">Absolute Value function description blah blah</span>
                    </span>
                </li>
                <li>
                    <Link href = "/graph_page">Cubic Function</Link>
                    <span class="tooltip"> ❓ 
                        <span class="tooltiptext">Cubic function description blah blah</span>
                    </span>
                </li>
            </ul>

        </div>
    )
}    


                // <p>1 1&frasl;2</p>
