import React from 'react';
import Link from 'next/link'; 
import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'
import '../_app.js'
import NavBar from '../navbar.js';
import Image from 'next/image'




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
        <div className='Login'>
            <Image src = "/color_full.png" width = {300} height={180}/>
            <h1>Login</h1>
            {showError && (  // <-- conditional rendering of popup box
                <div className="error-box">
                    <p>Invalid username or password.</p>
                    <button onClick={() => setShowError(false)}>OK</button>
                </div>
            )}
            <form onSubmit = {handleSubmit}>
                <p>Username</p>
                <input 
                    type="text" 
                    value={username} 
                    onChange = {(e)=>setUsername(e.target.value)}
                />
                <p>Password</p>
                <input 
                    type="password" 
                    value={password} 
                    onChange = {(e)=>setPassword(e.target.value)} 
                />
                <p></p>
                <button type="submit">Login</button>
            </form>
            {/* <button><Link href = "/signup">Create an account</Link></button> */}
        </div>
    )
}