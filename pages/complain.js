import React, { useEffect } from "react";
import User from "./components/User";
import Complainform from "./components/Complainform";
import Head from "next/head";
import { useRouter } from 'next/router';

const complain = () => {  
const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem("student-token")){
      router.push("/")
    }
  }, [])
  
  return (
    <>
    <Head>
           <title>SPEAK-UP : STUDENT HOME</title>
           <meta
             name="description"
             content="Generated by developer for the who needs to be thier doubts and want to learn from the expert"
           />
           <link rel="icon" href="/neev.png" />
         </Head>
    <div className='w-full h-full from-slate-600 bg-gradient-to-t'>
      <div className="flex ">
      <User/>
      <Complainform/>
      </div>
    </div>
    </>
  );
};

export default complain;