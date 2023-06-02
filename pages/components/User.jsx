import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const User = () => {
  const [studentName, setStudentName] = useState("")
  const router = useRouter();

   // toast configurations
   const toastConfig = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined,
    theme: "light",
    bodyClassName: "font-bold select-none font-Nunito",
    closeButton: false,
  };

  const handlelogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("student-token")
    router.push("/")
  }

  useEffect(() => {
    const getStudent = async () => {
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
        setStudentName(studentData.studentData.name)
        console.log(studentData.studentData.name);
      } else {
        toast.error(" Token Expired, Please Login Again", toastConfig);
      }
    };
    getStudent();
  }, [router.query]);

  return (
    <div className="rounded-lg mx-10 flex flex-col  bg-white/30 w-[20rem] mb-[1.3rem] border-4 border-white">
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
      <div className="flex items-center justify-center flex-col mb-14 mt-10">
        <img
          src="/images/logo2.png"
          alt="..."
          className="rounded-full w-[8rem]"
        />
        <h1 className="font-bold text-2xl text-green-900 uppercase">{studentName}</h1>
      </div>

      <Link href={"/userUpdate"} className="hover:text-green-900">
        <div className="relative flex w-56 my-5">
          <li className="list-none">
            <i className="fa-solid fa-file-pen text-2xl mx-5 hover:text-green-900 text-black"></i>
          </li>
          <li className="list-none text-xl">Update Profile</li>
        </div>
      </Link>
      <Link href={"/deleteuser"} className="hover:text-green-900">
      <div className="relative flex w-56 my-5">
        <li className="list-none">
          <i className="fa-solid fa-trash text-2xl mx-5  text-black"></i>
        </li>
        <li className="list-none text-xl">Delete Account</li>
      </div>
      </Link>
      <div className="relative flex w-56 my-5 mb-[12rem] hover:text-green-900 cursor-pointer">
        <li className="list-none">
          <i className="fa-solid fa-right-from-bracket text-2xl mx-5  text-black"></i>
        </li>
        <li className="list-none text-xl" onClick={handlelogout}>Log Out</li>
      </div>
    </div>
  );
};

export default User;
