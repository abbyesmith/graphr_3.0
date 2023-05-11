import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Signup from './homeComponents/signup.js'
import Login from './homeComponents/login.js'
import Footer from './footer';

import './_app.js'


export default function Home({setCurrUser, setloggedIn}) {
  return (
    
      <div>
        <h1>Welcome to Graphr Take 3</h1>
        <button><Link href = "/login">Existing User Log In</Link></button>
        <button><Link href = "/signup">New User Sign Up</Link></button>
        
      <div class>
        <div className = "box">
          <Login className = "login" setCurrUser={setCurrUser}/>
          <Signup className = "signup" setloggedIn={setloggedIn}/>
        </div>
      </div>
    </div>
  )
}
