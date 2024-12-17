import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
// import Modal from "../components/Modal";
import PicturePreviewModal from "../components/PicturePreviewModal";
import { set } from "mongoose";

export default function PassQuestionsPage() {
  const [peqies, setPeqies] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  console.log(imageUrl);
  const [isOpen, setIsOpen] = useState(false);

  const setAll = () => {
    setIsOpen(true);
    setImageUrl(peq.image);
  };

  useEffect(() => {
    const fetchPeqies = async () => {
      try {
        const res = await fetch("/api/post/getpeqs");
        const data = await res.json();

        if (!res.ok) {
          alert("Bad request");
        }
        if (res.ok) {
          setPeqies(data.peqs);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPeqies();
  }, [peqies.peqs]);
  // console.log();

  return (
    <>
      <PicturePreviewModal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className=''>
          {imageUrl && (
            <img src={imageUrl} alt='' className=' max-h-[80vh] w-auto' />
          )}
        </div>
      </PicturePreviewModal>
      {/* <div className=' questions-page-container bg-white'>
        <div className='bg-[#797777]'></div> */}
      {/* <div className='search-div '>
          <form onSubmit className='search-form-div font-semibold'>
          <div className=' search-form-div-items'> */}
      <div className=' max-w-3xl mx-auto min-h-screen   py-3 '>
        <div className='bg-[#797777]'></div>
        <div className=' w-full sticky top-0 z-10 shadow-lg'>
          <form
            onSubmit
            className=' flex flex-row 
           px-2'>
            <div className=' w-[100%]'>
              {/* <label> Department: </label>
            <input type='text' id='Dept' placeholder='Search...' />
          </div>
          <div className='search-form-div-items'>
            <label> Course Code </label> */}
              <input
                type='text'
                id='courseCode'
                placeholder='Search...'
                className='input-text'
              />
            </div>
            <button
              className='bg-[#333] w-[100px] text-white font-semibold
             '>
              Search
            </button>
          </form>
        </div>
        <div className='questions-container min-h-[100vh] pt-7 pr-2 pl-2 mb-8'>
          {peqies && peqies.length > 0 && (
            <div className=''>
              <div className=''>
                <h1 className='text-center mb-8 font-semibold text-xl'>
                  Recent pEqs
                </h1>
              </div>
              <div className='questions-grid'>
                {peqies.length > 0 &&
                  peqies.map((peq) => (
                    <QuestionCard
                      key={peq._id}
                      peq={peq}
                      get={() => {
                        setImageUrl(peq.image), setIsOpen(true);
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>

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
