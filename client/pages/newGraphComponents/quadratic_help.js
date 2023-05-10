
import Link from 'next/link'
import React, { useState } from "react";

const Video = ({ title, url }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="video">
        <h4 onClick={() => setExpanded(!expanded)}>
            {title} {expanded ? "▲ (click to collapse)" : "▼ (click to expand)"}
        </h4>
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
                <h2>Graphing Quadratic Functions Tutorial</h2>
                <h3>Graphing Standard Form:</h3>
                    <ul>
                        <li>y = ax<sup>2</sup> + bx + c</li>
                        <li>a indicateds if the graph opens up or down</li>
                        <li>c is the y-intercept</li>
                        <li>The axis of symmetry is found with the equation x = <sup>-b</sup> &frasl; <sub>2a</sub> </li>
                        <li>
                            <Video
                            title="Graphing Standard Tutorial"
                            url="https://www.youtube.com/embed/MQtsRYPx3v0"
                            />
                        </li>
                    </ul>
                <hr></hr>
                <h3>Graphing Vertex Form:</h3>
                    <ul>
                        <li>y = m(x - h)<sup>2</sup> + k</li>
                        <li>The y value is isolated on one side of the equal sign.</li>
                        <li>(h, k) is the vertex of the parabola</li>
                        <li>
                            <Video
                            title="Graphing Vertex Tutorial"
                            url="https://www.youtube.com/embed/7QMoNY6FzvM"
                            />
                        </li>
                    </ul>
                <h3>Graphing Factored Form:</h3>
                    <ul>
                        <li>y = a(x - r<sub>1</sub>)(x - r<sub>2</sub>)</li>
                        <li>There are two x's multiplied together through distribution</li>
                        <li>r<sub>1</sub> and r<sub>2</sub> are the roots (or x-intercepts) of the function</li>
                        <li>
                            <Video
                            title="Graphing Factored Form Tutorial"
                            url="https://www.youtube.com/embed/EV57jv7JKCs"
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