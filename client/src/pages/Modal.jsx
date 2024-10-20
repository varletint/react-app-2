import React from "react";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return (
    <div className='flex flex-col w-[70%] justify-center items-center'>
      <button className='btn' onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  );
}
