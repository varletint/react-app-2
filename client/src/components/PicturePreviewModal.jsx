import ReactDOM from "react-dom";
import { CancelSquareIcon, Cancel01Icon } from "hugeicons-react";

import React from "react";

export default function PicturePreviewModal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      className='fixed bg-[rgba(0,0,0,0.8)] p-2
  top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[100]
   '>
      <div
        className=' modal relative
       
       p-6 rounded-xl'>
        <div className='w-full border-b text-right '>
          <button
            onClick={onClose}
            className=' top-[10] right-[10] 
 text-white rounded-md    mb-3       '>
            <Cancel01Icon className='w-[1.8rem] h-[1.8rem]' />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
