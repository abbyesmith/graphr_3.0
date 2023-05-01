import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'
import './_app.js'
// import db from '../db.json';


export default function Signup({currUser,loggedIn,setcurrUser,setloggedIn}) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    // const [image, setImage] = useState("")
    const [instructor_name, setInstructorName] = useState("");
    const [instructor_email, setInstructorEmail]= useState("")
    const router = useRouter()


 
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            "username": username,
            "password": password,
            "email": email,
            // "image": image,
            "instructor_name": instructor_name,
            "instructor_email": instructor_email
        }

        fetch ("http://127.0.0.1:5555/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(r => r.json())
        .then(user => {
            // console.log(user)
            setloggedIn(true)
        })
        .then(()=> router.push('/login'))
    }

    // const animals = db.image_options.map((option) => (
    //     <option key={option.id} value={option.image}>
    //       <img src={option.image} alt={option.nickname} width="30" height="30" />
    //       {option.nickname}
    //     </option>
    //   ));

    return(
        <div>
            <h1>New User Sign Up</h1>
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
                {/* <p>Spirit Animal</p>
                <select value={image} onChange={(e) => setImage(e.target.value)}>
                    <option value="">Select an animal</option>
                    {animals}
                </select> */}
                {/* <p>Image</p>
                <input
                    type = "text" 
                    value = {image} 
                    onChange = {(e)=>setImage(e.target.value)}
                /> */}
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