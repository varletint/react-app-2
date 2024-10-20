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
} from "hugeicons-react";

export default function DashSidebar() {
  return (
    <div className='sidebar hidden md:flex'>
      <div className='sidebar-item-group'>
        <Link to={"/dashboard?tab=profile"}>
          <div className='sidebar-item tooltip'>
            <UserCircle02Icon className='w-8 h-8 text-gray-400 icon' />
            <span className='tooltiptext'>Profile</span>
          </div>
        </Link>
        <Link>
          <div className='sidebar-item tooltip'>
            <UserGroupIcon className='w-8 h-8 text-gray-400 icon' />
            <span className='tooltiptext'>Users</span>
          </div>
        </Link>
        <Link>
          <div className='sidebar-item tooltip'>
            <Files01Icon className='w-8 h-8 text-gray-400 icon' />
            <span className='tooltiptext'> Posts</span>
          </div>
        </Link>
        <Link>
          <div className='sidebar-item tooltip'>
            <Comment01Icon className='w-8 h-8 text-gray-400 icon' />
            <span className='tooltiptext'>Comments</span>
          </div>
        </Link>
        <Link>
          <div className='sidebar-item tooltip'>
            <PlusSignSquareIcon className='w-8 h-8 text-gray-400 icon' />
            <span className='tooltiptext'>Add a Post</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
