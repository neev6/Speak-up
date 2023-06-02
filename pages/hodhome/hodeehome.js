import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import NavEe from "../components/eecomponents/NavEe";
import Hodeedata from "../components/eecomponents/Hodeedata";

const Hodeehome = () => {
  const router = useRouter();
  useEffect(() => {
    if(!localStorage.getItem("hod-token")){
      router.push("/Hod")
    }
  }, [])
  return (
    <>
    <Head>
           <title>SPEAK-UP : HOD HOME</title>
           <meta
             name="description"
             content="Generated by developer for the who needs to be thier doubts and want to learn from the expert"
           />
           <link rel="icon" href="/neev.png" />
         </Head>
    <div className="w-full h-[41.3rem] from-slate-600 bg-gradient-to-t">
      <div className="flex">
        <NavEe />
        <Hodeedata />
      </div>
    </div>
  </>
  );
};

export default Hodeehome;
