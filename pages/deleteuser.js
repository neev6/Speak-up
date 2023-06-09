import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import "react-toastify/dist/ReactToastify.css";

const deleteuser = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("student-token")){
      router.push("/")
    }
  }, [])

   // toast configurations
   const toastConfig = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "dark",
    closeButton: false,
  };

    useEffect(() => {
      const getStudent = async () => {
        setLoading(true);
        const studentToken = await JSON.parse(
          localStorage.getItem("student-token")
        );
        const studentInformation = await fetch("/api/studentTokenData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: studentToken,
          }),
        });
        const studentData = await studentInformation.json();
        if (studentData.status === true) {
          setEmail(studentData.studentData.email)
          console.log(studentData.studentData.email);
          setLoading(false);
        } else {
          toast.error(" Token Expired, Please Login Again", toastConfig);
          setLoading(false);
        }
      };
      getStudent();
    }, [router.query]);

    const studentdelete = async(e)=>{
        e.preventDefault();
        if(!email || !password || !confirmPassword){
          toast.warning("Please Fill All The Fields",toastConfig);
          return 
        }
        if (password !== confirmPassword){
          toast.warning("Password Not Match",toastConfig);
          return
        }
        try {
            const deleteResult = await fetch("/api/deletestudent",{
              method: "DELETE",
              headers:{
                "Content-Type": "application/json"

              },
              body: JSON.stringify({
                email,
                password
              })
           })
           const deleteResponce = await deleteResult.json();
           if(deleteResponce.success === true) { 
            toast.success("User deleted successfully",toastConfig);
            router.push("/registered")
           } 
           else if(deleteResponce.success === "nomatch"){
            toast.error("Password Not match",toastConfig);
           }
           else {
            toast.error("User Not deleted",toastConfig);
           }
        } catch (error) {
          console.log(error);
        }
    }
  return (
    <>
      <Head>
        <title>SPEAK-UP : STUDENT </title>
        <meta
          name="description"
          content="Generated by developer for the who needs to be thier doubts and want to learn from the expert"
        />
        <link rel="icon" href="/neev.png" />
      </Head>
      <div className="flex items-center justify-center flex-col w-full h-full from-slate-600 bg-gradient-to-t">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        <div className="bg-green-900 rounded p-2 px-5 absolute top-[5rem] z-10">
          <h1 className="text-white text-3xl uppercase">DELETE PROFILE</h1>
        </div>
        <div className="border-4 border-white p-5 relative rounded bg-white/30 w-[30rem] shadow-3xl mb-[5.3rem]">
          <div className="flex items-center justify-center mt-9">
            <img src="/images/logo2.png " className="w-[12rem]" />
          </div>
          <form className="flex items-center justify-center flex-col ">
            <div className="relative">
              <div className="relative mb-6 ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fa-solid fa-envelope  text-green-900 text-3xl"></i>
                </div>
                <div className="absolute w-[2px] h-[36px] bg-green-700 top-[10px] bottom-[2rem] left-[52px]"></div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="text-green-800 cursor-not-allowed rounded-lg block w-[24rem] text-2xl pl-[4rem] p-3 dark:placeholder:text-green-900 bg-white dark:text-green-900 outline-none"
                  placeholder="Your Email"
                  disabled
                  value={email}
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative mb-5 ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className=" fa-solid fa-lock  text-green-900 text-3xl"></i>
                </div>
                <div className="absolute w-[2px] h-[36px] bg-green-700 top-[10px] bottom-[2rem] left-[52px]"></div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="text-green-800  rounded-lg block w-[24rem] text-2xl pl-[4rem] p-3 dark:placeholder:text-green-900 bg-white dark:text-green-900 outline-none"
                  placeholder="Password"
                  autoComplete="off"
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative mb-7 ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className=" fa-solid fa-lock  text-green-900 text-3xl"></i>
                </div>
                <div className="absolute w-[2px] h-[36px] bg-green-700 top-[10px] bottom-[2rem] left-[52px]"></div>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="text-green-800  rounded-lg block w-[24rem] text-2xl pl-[4rem] p-3 dark:placeholder:text-green-900 bg-white dark:text-green-900 outline-none"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  required
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-900 w-[15rem] hover:bg-green-800 shadow-4xl  transition-all duration-300 text-white h-[3.8rem] cursor-pointer rounded text-3xl  flex items-center justify-center"
            onClick={studentdelete}>
              {loading ? (
                <img
                  className="w-[3rem] h-[3rem]"
                  src="/loader/loaderstudent.gif"
                />
              ) : (
                "Delete"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default deleteuser;
