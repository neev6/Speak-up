import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";




const Studentregister = () => {
  const [model, setModel] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(null);
  const router = useRouter();
  const toastConfig = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "dark",

    closeButton: false,
  };

  const handleOtpCode = async (event) => {
    event.preventDefault();
    
    if(!otp){
      toast.warning("Please Enter Otp", toastConfig);
      return;
    }
    else if(otp.toString().length >6 || otp.toString().length<6){
      toast.warning("Please Enter 6 Digits Otp Code", toastConfig);
      return;
    }
    else {
      try {
        const otpResult = await fetch("/api/verify/Verifyotpuser",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otpCode: otp
          }),
        })
        const otpResponse = await otpResult.json();

        if (otpResponse.success === true) {
          toast.success("Otp Verified !!", toastConfig)
          setVerify(true);
          setModel(false);
        }
        else{
          toast.warning("wrong otp ", toastConfig);
          console.log(otpResponse)
        }
      } catch (error) { 
        toast.warning("Error Occured", toastConfig);
        setModel(false);
      }
    }
  }

  const handleVerifyEmail = async (event)=> {
    event.preventDefault();
    setModel(true)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Regex for the email
    if (!email) {
      toast.warning("Please Fill Email Field", toastConfig);
      setLoading(false);
      setModel(false); //Removing model
    
      return;
    } else if (!emailRegex.test(email)) {
      toast.warning("Invalid Email Address", toastConfig);
      setLoading(false);
      setModel(false);

      return;
    } else {
      const VerifyResult = await fetch("/api/verify/GeneratingOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
        }),
      });
      const VerifyData = await VerifyResult.json();
      if (VerifyData.success === true) {
        toast.success("An Otp Has Send On Your Email Address !!", toastConfig);
        setLoading(false);
      
      } else {
        toast.error("Otp Cannot Sent, Retry !!", toastConfig);
        setLoading(false);
    
        setModel(false);
      }
    }
  }

  const handleClick = async (event) => {
    event.preventDefault();

    setLoading(true);


    if (!name || !email || !password || !cpassword) {
      toast.warning("Please fill all the field !!", toastConfig);
      setTimeout(() => {
          setLoading(false);
      }, 3000);
      return;
    }
    if (password !== cpassword) {
      toast.warning("Password do not match !!", toastConfig);
      setTimeout(() => {
        setLoading(false);
    }, 3000);
      return;
    }

    if(verify === null){
      toast.warning("Please Verify Your Email !!", toastConfig);
      setTimeout(() => {
        setLoading(false);
    }, 3000);
      return;
    }

    try {
      const data = await fetch("/api/studentregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,password,email,cpassword
        }),
      });
      let response = await data.json();
      if (response.success === true) {
        toast.success("Registration Successfull !!", toastConfig);
        localStorage.setItem("student-token",JSON.stringify(response.token));
       setTimeout(() => {
        router.push("/complain")
       }, 2000);
       setTimeout(() => {
        setLoading(false);
    }, 3000);
      }

      else {
        toast.error("User already exist !!", toastConfig);
        setTimeout(() => {
          setLoading(false);
      }, 3000);
      }
    } catch (error) {
      toast.error("Registration Unsuccessfull !!",toastConfig);
      setTimeout(() => {
        setLoading(false);
    }, 3000);
      console.log(error);
    }
  };
  
  const handleModel = async (e) => {
    if(e.target.id === "Container"){
      if(model === true )
      {
        setModel(false)
      }
    }
    
 
  }

  return (

    
     
      <div className="flex items-center justify-center flex-col ">
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
          <h1 className="text-white text-3xl uppercase">Student</h1>
        </div>
        <div className="border-4 border-white p-5 relative rounded bg-white/30 w-[60rem] shadow-3xl mb-[3.8rem]">
          <div className="flex items-center justify-center mt-9">
            <img src="/images/logo2.png " className="w-[12rem]" />
          </div>
          <form>
            <div className="flex ">
              <div className="mx-12 mt-10">
                <div className="relative">
                  <div className="relative mb-11 ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-user  text-green-900 text-3xl"></i>
                    </div>
                    <div className="absolute w-[2px] h-[36px] bg-green-700 top-[10px] bottom-[2rem] left-[52px]"></div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="text-green-800  rounded-lg block w-[24rem] text-2xl pl-[4rem] p-3 dark:placeholder:text-green-900 bg-white dark:text-green-900 outline-none"
                      placeholder="Your Name"
                      autoComplete="off"
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-lock  text-green-900 text-3xl"></i>
                    </div>
                    <div className="absolute w-[2px] h-[36px] bg-green-700 top-[10px] bottom-[2rem] left-[52px]"></div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="text-green-800  rounded-lg block w-[24rem] text-2xl pl-[4rem] p-3 dark:placeholder:text-green-900 bg-white dark:text-green-900 outline-none"
                      placeholder="Create Password"
                      autoComplete="off"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div className="relative">
                  <div className="relative mb-1 ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-envelope  text-green-900 text-3xl"></i>
                    </div>
                    <div className="absolute w-[2px] h-[36px] bg-green-700 top-[10px] bottom-[2rem] left-[52px]"></div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="text-green-800  rounded-lg block w-[24rem] text-2xl pl-[4rem] p-3 dark:placeholder:text-green-900 bg-white dark:text-green-900 outline-none"
                      placeholder="Your Email"
                      autoComplete="off"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="text-lg font-bold cursor-pointer select-none text-green-900 hover:text-green-800 my-2 ml-3" onClick={handleVerifyEmail}>Verify Email</div>
                <div className="relative">
                  <div className="relative mb-5 ">
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
                      onChange={(e) => {
                        setCpassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-10 flex -ml-[27rem]">
                  <span className="text-xl">
                    Already have an account?{" "}
                    <Link
                      className=" text-green-800 hover:text-green-600  "
                      href={"/"}
                    >
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className=" ml-[20rem]">
              <button
                type="submit"
                className="bg-green-900 w-[15rem] hover:bg-green-800 shadow-4xl  transition-all duration-300 text-white h-[3.8rem] cursor-pointer rounded text-3xl  flex items-center justify-center"
                onClick={handleClick}
              >{loading ? <img className="w-[3rem] h-[3rem]" src="/loader/loaderstudent.gif"/>  : "Register"}</button>
            </div>
          </form> 
        </div>
       { model && <div
              id="Container"
              onClick={handleModel}
              className="fixed inset-0 bg-black  bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
            >
              <div className="bg-green-900 p-5 rounded flex flex-col items-center justify-center text-black dark:text-white ">
                <h1 className="text-3xl text-white select-none">
                  Welcome to{" "}
                  <span className="uppercase font-bold text-white">
                    speak-up
                  </span>
                </h1>
                <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center select-none my-6">
                  <i className="fa-solid fa-shield-halved text-slate-800 text-[4rem]"></i>
                </div>
                <h2 className="text-xl font-medium select-none">
                  Enter Your Verification Code
                </h2>
                <div>
                  <input type="number" className="text-black ring-2 ring-green-100 outline-none p-2 my-3 pl-4 text-lg rounded focus:ring-green-500 transition-all duration-500" placeholder="6 Digit Code" onChange={(event)=>setOtp(event.target.value)}/>
                </div>
                <button type="submit" className="text-white w-40 rounded-md my-5 p-2 flex items-center justify-center bg-green-700 hover:shadow-3xl hover:bg-green-900 transition-all duration-500" onClick={handleOtpCode}>

                  Verify Code
                </button>
              </div>
            </div>
}      </div>
    
  );
};

export default Studentregister;
