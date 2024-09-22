import React from "react";

export default function Header() {
  return (
    <div className='navbar'>
      <div className='desktop-nav'>
        <div className='navbar-logo'>Landmark</div>
        <div className='navbar-element'>
          <a href='/education'>Education</a>
          <a href='/news'>Politcs</a>
          <a href='/entertainment'>Entertainment</a>
          <a href='/about'>About</a>
        </div>
      </div>
    </div>
  );
}
