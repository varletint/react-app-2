import React from "react";
import { Link } from "react-router-dom";

export default function DashProfile() {
  return (
    <div
      className='max-w-lg mx-auto p-3 w-full
      min-h-screen '>
      <div className=' '>
        <h1
          className='text-center mt-20 font-semibold 
        text-2xl'>
          My Profile
        </h1>
        <div className=' flex flex-col items-center mt-5'>
          <img
            src=''
            alt=''
            className='w-[5rem] h-[5rem]
          bg-gray-100 rounded-[4rem]'
          />
          <div className=' flex flex-col gap-2 mt-2'>
            <label For='username' className=' '></label>
            <p className='font-semibold'>
              <span>Username</span>
            </p>
          </div>
          <div className='mt-10 border-b-2 w-full '>
            <p className='text-center font-semibold'>Info</p>
          </div>
          <div className='  w-full p-3'>
            <p className=' text-sm'>All of the wowwows coming soon...</p>
          </div>
          <div className='w-full flex justify-end mt-20'>
            <Link to={"/createPeqie"} className='btn'>
              {" "}
              Add pEq
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <div className='dash-profile'>
    //   <div className='dash-profile-card-div'>
    //     <div className='dash-profile-card'>
    //       <h1>Profile</h1>
    //       <div className='profile-details-container'>
    //         <div className='img-details'></div>
    //         <div className='profile-details'>
    //           <div className=' '>
    //             <form onSubmit className='search-form-div font-semibold'>
    //               <div className=' search-form-div-items'>
    //                 <label> Fullname/username: </label>
    //                 <input
    //                   type='text'
    //                   id='username'
    //                   placeholder='fullname/username'
    //                 />
    //               </div>

    //               {/* <button className='btn btn-search'>Search</button> */}
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
