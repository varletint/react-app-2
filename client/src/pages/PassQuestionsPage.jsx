import React from "react";
import QuestionCard from "../components/QuestionCard";

export default function PassQuestionsPage() {
  return (
    <div className=' questions-page-container'>
      <div className='search-div '>
        <form onSubmit className='search-form-div font-semibold'>
          <div className=' search-form-div-items'>
            <label> Department: </label>
            <input type='text' id='Dept' placeholder='Search...' />
          </div>
          <div className='search-form-div-items'>
            <label> Course Code </label>
            <input type='text' id='courseCode' placeholder='Search...' />
          </div>
          <button className='btn'>Search</button>
        </form>
      </div>
      <div className='questions-container min-h-[100vh] pt-7 pr-2 pl-2 '>
        <div className='questions-grid'>
          <QuestionCard />
        </div>
      </div>
    </div>
    // <div className=' questions-page-container'>
    //   <div className=' bg-red-500 search-div'>
    //     <form onSubmit className='search-form-div'>
    //       <div className=''>
    //         <label> Department: </label>
    //         <input type='text' id='Dept' placeholder='Search...' />
    //       </div>
    //       <div className=''>
    //         <label> Course Code </label>
    //         <input type='text' id='courseCode' placeholder='Search...' />
    //       </div>
    //     </form>
    //   </div>
    //   <div className='questions-container'>
    //     <div className='questions-grid'>
    //       <QuestionCard />
    //     </div>
    //   </div>
    // </div>
  );
}
