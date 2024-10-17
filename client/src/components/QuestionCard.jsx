import React from "react";
import { Link } from "react-router-dom";
import img1 from "../images/Q1.jpeg";

export default function QuestionCard({ question }) {
  return (
    <>
      <div className='question-card'>
        <div className='question-content'>
          <Link className='course-detail'>
            <p className='course-code'>CSC 301</p>
            <p className='course-title'>Tempting to Computer Dept</p>
          </Link>
          <Link className='img-content' to>
            <img src={img1} alt='' className='qs-img' />
          </Link>
        </div>
      </div>
      <div className='question-card'>
        <div className='question-content'>
          <Link className='course-detail'>
            <p className='course-code'>CSC 301</p>
            <p className='course-title'>Tempting to Computer Dept</p>
          </Link>
          <Link className='img-content' to>
            <img src={img1} alt='' className='qs-img' />
          </Link>
        </div>
      </div>
      <div className='question-card'>
        <div className='question-content'>
          <Link className='course-detail'>
            <p className='course-code'>CSC 301</p>
            <p className='course-title'>Tempting to Computer Dept</p>
          </Link>
          <Link className='img-content' to>
            <img src={img1} alt='' className='qs-img' />
          </Link>
        </div>
      </div>
      <div className='question-card'>
        <div className='question-content'>
          <Link className='course-detail'>
            <p className='course-code'>CSC 301</p>
            <p className='course-title'>Tempting to Computer Dept</p>
          </Link>
          <Link className='img-content' to>
            <img src={img1} alt='' className='qs-img' />
          </Link>
        </div>
      </div>
      <div className='question-card'>
        <div className='question-content'>
          <Link className='course-detail'>
            <p className='course-code'>CSC 301</p>
            <p className='course-title'>Tempting to Computer Dept</p>
          </Link>
          <Link className='img-content' to>
            <img src={img1} alt='' className='qs-img' />
          </Link>
        </div>
      </div>
    </>
  );
}
