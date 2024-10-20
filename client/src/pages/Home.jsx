import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className='home'>
      <div className='home-container'>
        <div className='big-logo underline underline-offset-[-73px]'>pEq</div>
        <div className='btn-section'>
          <Link to='/about' className='btn'>
            About the Creator
          </Link>
          <Link to='/questions' className='btn'>
            Browse pEq
          </Link>
        </div>
      </div>
    </section>
  );
}
