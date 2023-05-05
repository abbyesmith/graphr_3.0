// import React, {useState} from "react";
// import '../_app.js'

// export default function LinearHelp(){
//     const [help, setHelp] = useState(false);

//     const toggleHelp = () => {
//         setHelp(!help);
//     };
// // Not working, but doesn't seem to stop the functionality?
//     // if(help) {
//     //     document.body.classList.add('active-help')
//     // } else {
//     //     document.body.classList.remove('active-help')
//     // }


//     return (
//         <>
//             <button onClick = {toggleHelp} className = "btn-help">Need Help?</button>

//             {help && (
//                 <div className="help">
//                     <div onClick = {toggleHelp} className="overlay"></div>
//                     <div className = "help-content">
//                         <h2>Graphing Linear Functions Tutorial</h2>
//                         <h3>Graphing Standard Form:</h3>
//                         <ul>
//                             <li>ax + by = c</li>
//                             <li>x and y are on the same side of the equal sign</li>
//                             <li>
//                             <iframe width="560" height="315" src="https://www.youtube.com/embed/6CFE60iP2Ug" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
//                             </li>
//                         </ul>
//                         <h3>Graphing Slope Intercept Form:</h3>
//                         <ul>
//                             <li>y = mx + b</li>
//                             <li></li>
//                             <li>
//                             <iframe width="560" height="315" src="https://www.youtube.com/embed/IL3UCuXrUzE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
//                             </li>
//                         </ul>
//                         <h3>Graphing Point-Slope Form:</h3>
//                         <ul>
//                             <li>y - b = m(x - a)</li>
//                             <li>x and y are on the same side of the equal sign</li>
//                             <li>
//                             <iframe width="560" height="315" src="https://www.youtube.com/embed/K_OI9LA54AA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
//                             </li>
//                         </ul>
//                         <h3><Link href = "/email">Still Stuck? Email your teacher!</Link></h3>
//                         <button className = "close-help" onClick = {toggleHelp}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }
import Link from 'next/link'
import React, { useState } from "react";

const Video = ({ title, url }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="video">
        <h3 onClick={() => setExpanded(!expanded)}>
            {title} {expanded ? "▲" : "▼"}
        </h3>
        {expanded && (
            <iframe
            width="560"
            height="315"
            src={url}
            allowFullScreen
            ></iframe>
        )}
        </div>
    );
    };

    const LinearHelp = () => {
    const [help, setHelp] = useState(false);

    const toggleHelp = () => {
        setHelp(!help);
    };

    return (
        <>
        <button onClick={toggleHelp} className="btn-help">
            Need Help?
        </button>

        {help && (
            <div className="help">
            <div onClick={toggleHelp} className="overlay"></div>
            <div className="help-content">
                <h2>Graphing Linear Functions Tutorial</h2>
                <h3>Graphing Standard Form:</h3>
                <ul>
                <li>ax + by = c</li>
                <li>x and y are on the same side of the equal sign</li>
                <li>
                    <Video
                    title="Graphing Standard Form"
                    url="https://www.youtube.com/embed/6CFE60iP2Ug"
                    />
                </li>
                </ul>
                <h3>Graphing Slope Intercept Form:</h3>
                <ul>
                <li>y = mx + b</li>
                <li>The y value is isolated on one side of the equal sign.</li>
                <li>
                    <Video
                    title="Graphing Slope Intercept Form"
                    url="https://www.youtube.com/embed/IL3UCuXrUzE"
                    />
                </li>
                </ul>
                <h3>Graphing Point-Slope Form:</h3>
                <ul>
                <li>y - b = m(x - a)</li>
                <li>x and y are on the same side of the equal sign</li>
                <li>
                    <Video
                    title="Graphing Point-Slope Form"
                    url="https://www.youtube.com/embed/K_OI9LA54AA"
                    />
                </li>
                </ul>
                <h3><Link href = "/email">Still Stuck? Email your teacher!</Link></h3>

                <button className="close-help" onClick={toggleHelp}>
                Close
                </button>
            </div>
            </div>
        )}
        </>
    );
};

export default LinearHelp;