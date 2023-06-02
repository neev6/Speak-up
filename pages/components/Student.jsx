import React from 'react'

function Student() {
  return (
         <div className='flex flex-col justify-center  items-center absolute pt-[5rem]'>
        <form className='flex flex-col justify-center items-center pl-[43rem] p-10'>
            <input type="text" className="p-3 my-3 outline-none focus:ring-4 transition-all duration-300 ring-blue-700 rounded-2xl text-blue-700 placeholder:text-blue-700 " placeholder='username'/>
            <input type="email" className="p-3 my-3 outline-none focus:ring-4 transition-all duration-300 ring-blue-700 rounded-2xl text-blue-700 placeholder:text-blue-700 " placeholder='email'/>
            <input type="password" className="p-3 my-3 outline-none focus:ring-4 transition-all duration-300 ring-blue-700 rounded-2xl text-blue-700 placeholder:text-blue-700" placeholder='password'/>
            <input type="password" className="p-3 my-3 outline-none focus:ring-4 transition-all duration-300 ring-blue-700 rounded-2xl text-blue-700 placeholder:text-blue-700" placeholder='confirm password'/>
         </form>
    </div>

  )
}

export default Student