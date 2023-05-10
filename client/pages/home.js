import React, {useState} from 'react';
import Link from 'next/link'; 
import NavBar from './navbar';
import './_app.js'
import Footer from './footer';
import Image from 'next/image'


export default function Home ({currUser}) {
    // use this when you are using currUser 
    if (!currUser){
        return(
            <div>
                Loading
            </div>
        )
    }


    const Expand = ({content}) => {
        const [expanded, setExpanded] = useState(false);
    
        return (
            <div className="content">
                <h4 onClick={() => setExpanded(!expanded)}>
                    {expanded ? "▲ (click to collapse)" : "▼ (click to expand)"}
                </h4>
                {expanded && content}
            </div>
        );
    };

    return (
        <div>
            <NavBar/>
            <h1>{`Welcome to Graphr ${currUser.username}!`}</h1>
            <h2>Graphr is a new site that helps students complete traditional graphing worksheets in a digital space</h2>
            <div>
                <h2>How to use Graphr</h2>
                <Expand 
                    content = {
                        <div >
                            <h4>New Graph</h4>
                                    <ul>
                                        <li>Select "New Graph" from the menu bar</li>
                                        <li>Select which function you are graphing. If you are unsure, hover over the question mark to learn more about the function types.</li>
                                        <li>Use your math skills to determine 5 points that will be used the graph the function & enter the points in the form.</li>
                                        <li>If the 5 submitted points form that function, then the remainer of the graph will appear.</li>
                                        <li>Use the "Take a Screenshot" button to copy the graph to your clipboard, then paste the image wherever you like.</li>
                                        <li>Use the "Save Graph" feature to save your work</li>
                                        <li>Checkout the "Need Help" materials if you are stuck</li>
                                    </ul>
                            <h4>My Saved Graphs</h4>
                            <ul>
                                <li>Check out all of your saved successful graphs h</li>
                            </ul>
                            <h4>Profile</h4>
                            <ul>
                                <li>Update your username, email, instructor's name and/or email</li>
                            </ul>
                            <h4>Email your Teacher</h4>
                            <ul>
                                <li>If you and your teacher are using gmail, you can send them a message directly from Graphr!</li>
                                <li>If your teacher responds to your email, check your email folder for their response</li>
                            </ul>
                        </div>

                    }
                />
            </div>
            <div>
                <h2>Why was Graphr made?</h2>
                <Expand
                    content = {
                        <div className='content'>
                            <Image src = "/abby.jpeg" width={90} height={120}/>
                            <p>Abby Smith spent over a decade as a secondary math teacher. Once the switch to one to one technology was the standard in the American classroom, math teachers and students experienced unique difficulties digitizing many assignments, such as graphing worksheets. When Abby decided to become a student again and attend Flatiron School in Denver Colorado in the pursuit of becoming a full stack software engineer, she wanted to help her friends who were still in the classroom. Graphr is a project to help students and teachers eliminate one of the hurdles that students and teachers face.</p>

                        </div>

                    }
                />
            </div>
            
            <Footer />
        </div>
    )
}