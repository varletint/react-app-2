import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <section className='home'>
      <div className='home-container'>
        <div className='big-logo'>Logo</div>
        <div className='btn-section'>
          <Link to='/about'>
            <button className='btn'>About the Creator</button>
          </Link>
          <Link to='/questions'>
            <button className='btn'>Past Q</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
