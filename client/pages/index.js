import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './_app.js'




export default function Home() {
  return (
    <div>
      <h1>Welcome to Graphr Take 3</h1>
      <button><Link href = "/login">Existing User Log In</Link></button>
      <button><Link href = "/signup">New User Sign Up</Link></button>
    </div>
  )
}
