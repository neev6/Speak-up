import React from 'react'

function Admin() {
  return (
    <div className='flex flex-col justify-center items-center pt-[5rem]'>
        <form className='flex flex-col mt-[11rem] justify-center items-center pl-[43rem] p-10'>
            <input type="text" className="p-3 my-3 outline-none focus:ring-4 transition-all duration-300 ring-green-700 rounded-2xl text-green-700 placeholder:text-green-700 " placeholder='username'/>
            <input type="email" className="p-3 my-3 outline-none focus:ring-4 transition-all duration-300 ring-green-700 rounded-2xl text-green-700 placeholder:text-green-700 " placeholder='email'/>
            <input type="password" className="p-3 my-3 outline-none focus:ring-4 transition-all duration-300 ring-green-700 rounded-2xl text-green-700 placeholder:text-green-700" placeholder='password'/>
            <input type="password" className="p-3 my-3 outline-none focus:ring-4 transition-all duration-300 ring-green-700 rounded-2xl text-green-700 placeholder:text-green-700" placeholder='confirm password'/>
         </form>
    </div>
  )
}

export default Admin