import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'
import Link from 'next/link'; 
import '../_app.js'
// import db from '../db.json';


export default function Signup({currUser,loggedIn,setcurrUser,setloggedIn}) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [instructor_name, setInstructorName] = useState("");
    const [instructor_email, setInstructorEmail]= useState("")
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()


    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            "username": username,
            "password": password,
            "email": email,
            "instructor_name": instructor_name,
            "instructor_email": instructor_email
        }

        fetch ("http://127.0.0.1:5555/signupUser",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(r => {
            console.log(r.ok)
            if (r.ok) {
                console.log(r)
                r.json().then(user => {
                    console.log(user)
                    setloggedIn(true)
                    setShowAlert(true)
                    }
                )
            } else {
                if (r.status === 422) {
                    alert("An account with that username already exists. Please choose a different username and submit the form again.")
                } else {
                    alert("there was an error creating the account. Please try again later.")
                }
            }
            return(undefined)
        })
        .then(user => {
            console.log(user)
            if (user){
                setloggedIn(true)
                setShowAlert(true)
            }
        })
        .catch(error => {
            console.log(error)
            alert("there was an error creating the account. Please try again")
            // if (error.response.status === 422) {
            //     alert("An account with that username already exists. Please choose a different username and submit the form again.")
            // } else {
            //     alert("there was an error creating the account. Please try again later.")
            // }
        })
    }

    useEffect(() => {
        if (showAlert){
            alert('Account successfully create. Please login to access Graphr')
            setUsername('')
            setPassword('')
            setEmail('')
            setInstructorName('')
            setInstructorEmail('')
            setShowAlert(false)
        }

    })


    return(
        <div className = "signup">
            <h1>New User Sign Up</h1>
            {/* <button><Link href = "/login">Already have an accoutn?</Link></button> */}
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
                <p>Email</p>
                <input 
                    type="text" 
                    value={email} 
                    onChange = {(e)=>setEmail(e.target.value)}
                />
                <p>Instructor Name</p>
                <input 
                    type="text" 
                    value={instructor_name} 
                    onChange = {(e)=>setInstructorName(e.target.value)}
                />
                <p>Instructor Email</p>
                <input 
                    type="text" 
                    value={instructor_email} 
                    onChange = {(e)=>setInstructorEmail(e.target.value)}
                />
                <button type = "submit">Sign Up</button>
            </form>

            
        </div>
    )

}