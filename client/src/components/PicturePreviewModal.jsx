import ReactDOM from "react-dom";
import {
  CancelSquareIcon,
  Cancel01Icon,
  ArrowLeft02Icon,
} from "hugeicons-react";

import React from "react";

export default function PicturePreviewModal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className='fixed bg-[rgb(0,0,0)] 
  top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[100]
   '>
      {" "}
      <button
        onClick={onClose}
        className='fixed z-[100] top-[20px] right-[85%]
      '>
        {/* className=' top-[10] right-[10] 
text-white rounded-md    mb-3       '> */}
        <ArrowLeft02Icon className='w-[1.8rem] h-[1.8rem]  text-white' />
      </button>
      <div>
        <div
          className=' modal relative
       
       rounded-xl'>
          <div className='w-full border-b text-right '></div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
