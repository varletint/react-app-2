import React from "react";

export default function Header() {
  function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  return (
    <>
      <div>
        <nav id='desktop-nav'>
          <div className='logo'>Logo</div>
          <div>
            <ul className='nav-links'>
              <li>
                <a href='#about'>About</a>
              </li>
              <li>
                <a href='#about'>About</a>
              </li>
              <li>
                <a href='#about'>About</a>
              </li>
              <li>
                <a href='#about'>About</a>
              </li>
            </ul>
          </div>
        </nav>
        <nav id='hamburger-nav'>
          <div className='logo'>Logo</div>
          <div className='hamburger-menu'>
            <div className='hamburger-icon' onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className='menu-links'>
              <li>
                <a href='#' onClick={toggleMenu}>
                  About
                </a>
              </li>
              <li>
                <a href='#' onClick={toggleMenu}>
                  About
                </a>
              </li>
              <li>
                <a href='#' onClick={toggleMenu}>
                  About
                </a>
              </li>
              <li>
                <a href='#' onClick={toggleMenu}>
                  About
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
