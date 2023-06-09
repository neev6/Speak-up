import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import Loder from './components/Loder'
import Navbar from './components/Navbar'
import Head from "next/head";
import { StrictMode } from 'react';

export default function App({ Component, pageProps }) {
  const [isLoding,setIsLoding]=useState (true)
  const [render, setRender] = useState (0);
  useEffect(()=>{
    setTimeout(
      ()=>{
        setIsLoding(false)
      },
      500
    )
  },[])
  return(
    <>
{ isLoding?(<Loder/>):
    ( 
    <>
    <StrictMode>
     <Head>
            <title>SPEAK-UP</title>
            <meta
              name="description"
              content="Generated by developer for the who needs to be thier doubts and want to learn from the expert"
            />
            <link rel="icon" href="/neev.png" />
          </Head>
    <Navbar/>
    <Component {...pageProps} />
    </StrictMode>
    </>
    )}
     

    </>
   )
}
