import React from "react";
import { Link } from "react-router-dom";
import img1 from "../images/Q1.jpeg";

export default function QuestionCard({ peq }) {
  return (
    <>
      <div className='question-card shadow-md '>
        <div className='question-content'>
          <Link className='course-detail'>
            <p className='course-title uppercase'>{peq.courseTitle}</p>
            <p className='course-code uppercase'>{peq.courseCode}</p>
          </Link>
          <Link className='img-content'>
            <img src={peq.image} alt={peq.title} className='qs-img' />
          </Link>
        </div>
      </div>
    </>
  );
}
