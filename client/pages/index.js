import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Signup from './homeComponents/signup.js'
import Login from './homeComponents/login.js'
import Footer from './footer';

import './_app.js'




export default function Home({setCurrUser, setloggedIn}) {
  return (
    <div class>
      <div className = "box">
        <Login className = "login" setCurrUser={setCurrUser}/>
        <Signup className = "signup" setloggedIn={setloggedIn}/>
      </div>
    </div>
  )
}