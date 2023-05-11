import '@/styles/globals.css'
import {useEffect, useState} from 'react'
import { Router, useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const [currUser, setCurrUser] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);
  const router = useRouter();

  // _app.get("/*", function (req, res){
  //   res.sendFile(
  //     path.join(__dirname, "../client/build/index.html"),
  //     function (err){
  //       if (err) {
  //         res.status(500).send(err)
  //       }
  //     }
  //   )
  // })

  useEffect(()=>{
    fetch('/check_session')
    .then(r=>r.json())
    .then(data=>setCurrUser(data))
  }, [])


  return <Component {...pageProps} router={router} currUser = {currUser} setCurrUser = {setCurrUser} setloggedIn={setloggedIn} test= {"test"}/>
}

