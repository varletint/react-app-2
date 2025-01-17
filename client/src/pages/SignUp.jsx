import React from "react";

export default function SignUp() {
  return (
    <div className=' min-h-screen flex justify-center mt-10 md:mt-0 md:items-center  '>
      <div
        className='  bg- p-3 max-w-3xl mx-auto  
        flex flex-col gap-7  rounded-lg
         w-full md:flex-row md:items-center '>
        <div
          className=' w-full flex flex-col md:flex-row md:items-center
           gap-4  
        '>
          <div className='flex-1'>
            <h1
              className=' text-center text-7xl md:text-[8rem]
             font-semibold sm:mb-[9rem] mb-[5rem]'>
              pEq
            </h1>
          </div>
          <form className=' flex-1 flex flex-col gap-7 '>
            <div className='flex flex-col gap-2'>
              <label>Username</label>
              <input
                type='text'
                placeholder='username'
                className='input-text'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label>Password</label>
              <input
                type='text'
                placeholder='password'
                className='input-text'
              />
            </div>
            <button className='btn hover:bg-black'> Sign In</button>
            <p className='text-center text-sm '>
              Already have an account, Sign in
              <span className=' text-blue-700'>
                <a href='/' className='  ml-1'>
                  here
                </a>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
