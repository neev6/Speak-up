import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
const Hodnav = () => {
  const router = useRouter();
  const handlelogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("hod-token")
    router.push("/Hod/cs")
  }

  return (
    <div className='rounded-lg mx-10 flex flex-col  bg-white/30 w-[15rem] mb-[1.3rem] border-4 border-white'>
        <div className='flex items-center justify-center flex-col mb-14 mt-10'>
        <img src='/images/logo2.png' alt='...' className='rounded-full w-[8rem]'/>
        <h1 className='font-bold text-2xl text-green-900'>C.S.</h1>
        </div>
        <Link href={"/hodupdate"} className="hover:text-green-900">
        <div className='relative flex w-56 my-5'>
            <li className='list-none'><i className="fa-solid fa-file-pen text-2xl mx-5  text-black"></i></li>
            <li className='list-none cursor-pointer text-xl'>Update Profile</li>
        </div>
        </Link>
        <div className='relative flex w-56 my-5 mb-[16rem] hover:text-green-900'>
            <li className='list-none'><i className="fa-solid fa-right-from-bracket text-2xl mx-5  text-black"></i></li>
            <li className='list-none text-xl cursor-pointer' onClick={handlelogout}>Log Out</li>
        </div>
    </div>
  )
}

export default Hodnav