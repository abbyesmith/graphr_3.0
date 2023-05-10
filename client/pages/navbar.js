import { Inter } from 'next/font/google'
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import './_app.js'
import Image from 'next/image'
import styles from '../styles/navbar.module.css'
import {useState} from 'react'



export default function NavBar () {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div className = {styles.navbar}>
            <nav >
                <span className = {styles.container}>
                <Link href = "/home" className = {styles.navbranding}><Image src = "/simple_logo.jpeg" width={40} height={40}/>Graphr</Link>
                    <p className = {styles.navmotto}>Graphing made easy</p>
                    <ul className = {`${styles.navmenu} ${isOpen && styles.active}`}>
                        <li><Link href = "/new_graph" className = {styles.navlink}>New Graph</Link></li>
                        <li><Link href = "/my_graphs" className = {styles.navlink}>My Saved Graphs</Link></li>
                        <li><Link href = "/profile" className = {styles.navlink}>Profile</Link></li>
                        <li><Link href = "/email" className = {styles.navlink}>Email My Teacher</Link></li>
                        <li><Link href = "/" className = {styles.navlink}>Log in / Log Out</Link></li>
                    </ul>
                    <div className = {`${styles.hamburger} ${isOpen && styles.active}`} onClick = {toggleMenu}>
                        <span className = {styles.bar}></span>
                        <span className = {styles.bar}></span>
                        <span className = {styles.bar}></span>
                    </div>
                </span>
            </nav>
        </div>
    )
}

// <div className="topnav">
//     <a href="#home" className="active">Logo</a>
//     {/* Navigation links (hidden by default) */}
//     <div id="myLinks">
//         <a href="/home">News</a>
//         <a href="/new_graph">Contact</a>
//         <a href="/my_graphs">About</a>
        
//     </div>
//     {/* "Hamburger menu" / "Bar icon" to toggle the navigation links */}
//     <a href="javascript:void(0);" className="icon" onclick="myFunction()">
//         <i className="fa fa-bars"></i>
//     </a>
// </div>