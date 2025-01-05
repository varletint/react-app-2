import { Link } from "react-router-dom";
import {
  UserCircle02Icon,
  UserGroupIcon,
  Files01Icon,
  Comment01Icon,
  PlusSignIcon,
  PlusSignCircleIcon,
  PlusSignSquareIcon,
  PlusMinus01Icon,
  Message01Icon,
  Home11Icon,
  Search01Icon,
  SearchCircleIcon,
  SearchAddIcon,
} from "hugeicons-react";

import { useLocation } from "react-router-dom";

export default function DashSidebar() {
  const path = useLocation().search;
  return (
    <div
      className=' max-w-xl mx-auto 
       w-full
    '>
      <div
        className='flex flex-row sm:gap-[20px] sm:justify-center
      justify-evenly items-center  h-[7vh]'>
        <Link to={"/"}>
          <div className=' tooltip'>
            {/* <UserCircle02Icon className={"   w-8 h-8 text-gray-400 icon"} />
            <span className='tooltiptext'>Profile</span> */}
            {path == "" ? (
              <>
                <Home11Icon
                  className={"   w-6 h-6 fill-gray-400 text-gray-400   icon"}
                />
                <span className='tooltiptext'>Profile</span>
              </>
            ) : (
              <>
                <Home11Icon className={"   w-6 h-6 text-gray-400  icon"} />
              </>
            )}
          </div>
        </Link>
        <Link to={"/dashboard?tab=my-peqies"}>
          {path == "?tab=my-peqies" ? (
            <div className=' tooltip'>
              <Search01Icon className='w-6 h-6 text-gray-400  icon' />
              <span className='tooltiptext'> Posts</span>
            </div>
          ) : (
            <div className=' tooltip'>
              <Search01Icon className='w-6 h-6  text-gray-400 rounded-full icon' />

              <span className='tooltiptext'> Posts</span>
            </div>
          )}
        </Link>

        <Link to={"/dashboard?tab=profile2"}>
          <div className=' tooltip'>
            {path == "?tab=profile2" ? (
              <>
                <UserGroupIcon
                  className='   w-8 h-8 text-gray-400 fill-gray-400  
                   icon'
                />
                <span className='tooltiptext'>Users</span>
              </>
            ) : (
              <>
                {" "}
                <UserGroupIcon
                  className='w-8 h-8 text-gray-400
                   icon'
                />
              </>
            )}
          </div>
        </Link>
        <Link to={"/dashboard?tab=profile"}>
          <div className=' tooltip'>
            {/* <UserCircle02Icon className={"   w-8 h-8 text-gray-400 icon"} />
            <span className='tooltiptext'>Profile</span> */}
            {path == "?tab=profile" ? (
              <>
                <UserCircle02Icon
                  className={
                    "   w-8 h-8 bg-gray-400 rounded-full text-white fill-gray-400  icon"
                  }
                />
                <span className='tooltiptext'>Profile</span>
              </>
            ) : (
              <>
                {" "}
                <UserCircle02Icon className='   w-6 h-6 text-gray-400 border-gray-400 border-[2px] icon rounded-full' />
              </>
            )}
          </div>
        </Link>

        {/* <Link>
          <div className=' tooltip'>
            <Message01Icon className='w-8 h-8 text-gray-400 ' />
            <span className='tooltiptext'>Comments</span>
          </div>
        </Link>
        <Link>
          <div className=' tooltip'>
            <PlusSignSquareIcon className='w-8 h-8 text-white fill-gray-400 icon' />
            <span className='tooltiptext'>Add a Post</span>
          </div>
        </Link> */}
      </div>
    </div>
    // <div className='sidebar hidden '>
    //   <div className='sidebar-item-group'>
    //     <Link to={"/dashboard?tab=profile"}>
    //       <div className='sidebar-item tooltip'>
    //         <UserCircle02Icon className='w-8 h-8 text-gray-400 icon' />
    //         <span className='tooltiptext'>Profile</span>
    //       </div>
    //     </Link>
    //     <Link>
    //       <div className='sidebar-item tooltip'>
    //         <UserGroupIcon className='w-8 h-8 text-gray-400 icon' />
    //         <span className='tooltiptext'>Users</span>
    //       </div>
    //     </Link>
    //     <Link>
    //       <div className='sidebar-item tooltip'>
    //         <Files01Icon className='w-8 h-8 text-gray-400 icon' />
    //         <span className='tooltiptext'> Posts</span>
    //       </div>
    //     </Link>
    //     <Link>
    //       <div className='sidebar-item tooltip'>
    //         <Comment01Icon className='w-8 h-8 text-gray-400 icon' />
    //         <span className='tooltiptext'>Comments</span>
    //       </div>
    //     </Link>
    //     <Link>
    //       <div className='sidebar-item tooltip'>
    //         <PlusSignSquareIcon className='w-8 h-8 text-gray-400 icon' />
    //         <span className='tooltiptext'>Add a Post</span>
    //       </div>
    //     </Link>
    //   </div>
    // </div>
  );
}
