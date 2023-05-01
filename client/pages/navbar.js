import { Inter } from 'next/font/google'
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import './_app.js'

 


export default function NavBar () {
    const router = useRouter()

    return(
        <div >
            <nav>
                <span className = "container">
                    <button><Link href = "/newgraph">New Graph</Link></button>
                    <button><Link href = "/mygraphs">My Saved Graphs</Link></button>
                    <button><Link href = "/profile">Profile</Link></button>
                    <button><Link href = "/login">Log in / Log Out</Link></button>
                </span>
            </nav>
        </div>
    )
}
