import React from 'react';
import Link from 'next/link'; 
// import NavBar from './navbar';
import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'
import './_app.js'
import NavBar from './navbar';



export default function Login ({onLogin, setCurrUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    // const [currUser, setCurrUser] = useState("")
    const router = useRouter()

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            "username": username,
            "password": password
        }

        fetch ("/loginUser",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((r) => {
            console.log(r)
            setIsLoading(false);
            if (r.ok) {
              r.json().then((user) => {
                setCurrUser(user);
                console.log(user);
                router.push('/home');
              });
            } else {
                r.json().then((err) => setErrors(err.errors));
                setShowError(true);

            }
        });
    }

    return (
        <div>
            {/* <NavBar/> */}
            <h1>Login</h1>
            {showError && (  // <-- conditional rendering of popup box
                <div className="error-box">
                    <p>Invalid username or password.</p>
                    <button onClick={() => setShowError(false)}>OK</button>
                </div>
            )}
            <form onSubmit = {handleSubmit}>
                <p style={{color: "black"}}>Username</p>
                <input 
                    type="text" 
                    value={username} 
                    onChange = {(e)=>setUsername(e.target.value)}
                    style={{color: "black"}} 
                />
                <p style={{color: "black"}}>Password</p>
                <input 
                    type="password" 
                    value={password} 
                    onChange = {(e)=>setPassword(e.target.value)}
                    style={{color: "black"}} 
                />
                <p></p>
                <button style={{color: "black"}} type="submit">Login</button>
            </form>
        </div>
    )
}