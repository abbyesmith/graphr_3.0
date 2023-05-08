import React from 'react';
import Link from 'next/link'; 
import NavBar from './navbar';
import './_app.js'
import Footer from './footer';


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
                    <Link href = "/graph_page" className = "function">Linear Function</Link>
                    <span class="tooltip"> ❓ 
                        <span class="tooltiptext">
                            <p>Linear functions are equations that create a straight line when graphed. They have a constant rate of change.</p> 
                            <p>Here are a few examples of linear functions:</p> 
                            <li>y = <sup>1</sup>&frasl;<sub>2</sub>x+6</li>
                            <br></br>
                            <li>y - 6 = -2(x - 9)</li>
                            <br></br>
                            <li>2x + 9y = 36 </li></span>
                    </span>
                </li>
                <li>
                <Link href = "/graph_page" className = "function">Quadratic Function</Link>
                    <span class="tooltip"> ❓ 
                        <span class="tooltiptext">
                            <p>Quadratic functions are equations that create a parabolic curve when graphed. THey have an index of 2.</p> 
                            <p>Here are a few examples of quadratic functions:</p> 
                            <li>y = <sup>3</sup>&frasl;<sub>2</sub>(x-7)(x+1)</li>
                            <br></br>
                            <li>y = -2x<sup>2</sup>+ 3x - 7</li>
                            <br></br>
                            <li>y = <sup>1</sup>&frasl;<sub>4</sub>(x - 6) - 3 </li></span>
                    </span>
                </li>
                {/* <li>
                <Link href = "/graph_page" className = "function">Cubic Function</Link>
                    <span class="tooltip"> ❓ 
                        <span class="tooltiptext">
                            <p>Quadratic functions are equations that create a parabolic curve when graphed. THey have an index of 2.</p> 
                            <p>Here are a few examples of quadratic functions:</p> 
                            <li>y = <sup>3</sup>&frasl;<sub>2</sub>(x-7)(x+1)</li>
                            <br></br>
                            <li>y = -2x<sup>2</sup>+ 3x - 7</li>
                            <br></br>
                            <li>y = <sup>1</sup>&frasl;<sub>4</sub>(x - 6) - 3 </li></span>
                    </span>
                </li>
                <li>
                <Link href = "/graph_page" className = "function">Absolute Value Function</Link>
                    <span class="tooltip"> ❓ 
                        <span class="tooltiptext">
                            <p>Linear functions are equations that create a straight line when graphed. They have a constant rate of change.</p> 
                            <p>Here are a few examples of linear functions:</p> 
                            <li>y = <sup>1</sup>&frasl;<sub>2</sub>x+6</li>
                            <br></br>
                            <li>y - 6 = -2(x - 9)</li>
                            <br></br>
                            <li>2x + 9y = 36 </li></span>
                    </span>
                </li> */}
            </ul>
                {/* Fraction: <sup>1</sup>&frasl;<sub>2</sub> */}
            <Footer />
        </div>
    )
}    


                // <p>1 1&frasl;2</p>
