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
} from "hugeicons-react";

import { useLocation } from "react-router-dom";

export default function DashSidebar() {
  const path = useLocation().search;
  console.log(path);
  return (
    <div
      className='max-w-lg mx-auto 
       w-full
    shadow-sm'>
      <div className='flex flex-row justify-evenly items-center h-[7vh]'>
        <Link to={"/dashboard?tab=profile"}>
          <div className=' tooltip'>
            {/* <UserCircle02Icon className={"   w-8 h-8 text-gray-400 icon"} />
            <span className='tooltiptext'>Profile</span> */}
            {path == "?tab=profile" ? (
              <>
                <UserCircle02Icon
                  className={"   w-8 h-8 text-white fill-gray-400  icon"}
                />
                <span className='tooltiptext'>Profile</span>
              </>
            ) : (
              <>
                {" "}
                <UserCircle02Icon
                  className={"   w-8 h-8 text-gray-400  icon"}
                />
              </>
            )}
          </div>
        </Link>
        <Link to={"/dashboard?tab=profile2"}>
          <div className=' tooltip'>
            {path == "?tab=profile2" ? (
              <>
                <UserGroupIcon
                  className={"   w-8 h-8 text-gray-400 fill-gray-400  icon"}
                />
                <span className='tooltiptext'>Profile</span>
              </>
            ) : (
              <>
                {" "}
                <UserGroupIcon className={"   w-8 h-8 text-gray-400  icon"} />
              </>
            )}
          </div>
        </Link>
        <Link>
          <div className=' tooltip'>
            <Files01Icon className='w-8 h-8 text-white fill-gray-400 icon' />
            <span className='tooltiptext'> Posts</span>
          </div>
        </Link>
        <Link>
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
        </Link>
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
