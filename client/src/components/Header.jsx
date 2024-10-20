import { Link } from "react-router-dom";

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
          <Link to={"/"} className='logo underline underline-offset-[-23px]'>
            pEq
          </Link>
          <div>
            <ul className='nav-links'>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='#'>About</a>
              </li>
              <li>
                <a href='/sign-in'>Sign In</a>
              </li>
              <li>
                <a href='/dashboard?tab=profile'>Profile</a>
              </li>
            </ul>
          </div>
        </nav>
        <nav id='hamburger-nav'>
          <div className='logo underline underline-offset-[-23px]'>pEq</div>
          <div className='hamburger-menu'>
            <div className='hamburger-icon' onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className='menu-links '>
              <li>
                <a href='/' onClick={toggleMenu}>
                  Home
                </a>
              </li>
              <li>
                <a href='#' onClick={toggleMenu}>
                  About
                </a>
              </li>
              <li>
                <a href='/sign-in' onClick={toggleMenu} className='text-nowrap'>
                  Sign In
                </a>
              </li>
              <li>
                <a href='/dashboard?tab=profile' onClick={toggleMenu}>
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
