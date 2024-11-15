import ReactDOM from "react-dom";
import { CancelSquareIcon } from "hugeicons-react";

import React from "react";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <div
      className='fixed bg-[rgb(0,0,0,.6)]
  top-0 left-0 right-0 bottom-0 flex items-center justify-center
   '>
      <div
        className=' modal relative bg-white 
      px-3 py-2 w-[22rem] md:w-[32rem] rounded-xl'>
        <button
          onClick={onClose}
          className=' absolute top-[10] right-[10]
         border-b '>
          <CancelSquareIcon />
        </button>
        {children}
      </div>
    </div>
  );
}

// export default function Modal({ open, children, onClose }) {
//   if (!open) return null;

//   return ReactDOM.createPortal(
//     <>
//       <div
//         className='Overlay-style fixed top-0 left-0 right-0 bottom-0
//       bg-[rgb(0,0,0,.7)]'
//         onClick={onClose}></div>
//       <div
//         className='modal fixed top-[50%] left-[50%] bg-[#f9f9f9ec]
//       translate-x-[-50%] translate-y-[-50%] p-[1rem] z-[1000]
//        md:w-[32rem] rounded-lg
//     '>
//         <button
//           className=' px-3 py-[0.3rem] border-[1px] border-[#333]
//           bg-[#333] text-white rounded-full hover:border-none
//            transition-all  '
//           onClick={onClose}>
//           X
//         </button>
//         {children}
//       </div>
//     </>,
//     document.getElementById("portal")
//   );
// }
