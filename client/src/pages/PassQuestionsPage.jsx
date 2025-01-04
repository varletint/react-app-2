import { useState, useEffect, useRef } from "react";
import QuestionCard from "../components/QuestionCard";
// import Modal from "../components/Modal";
import PicturePreviewModal from "../components/PicturePreviewModal";
import { set } from "mongoose";
import { useLocation, useNavigate } from "react-router-dom";

export default function PassQuestionsPage() {
  const [peqies, setPeqies] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const observer = useRef();
  const lastElementRef = useRef(null);

  console.log(searchTerm);

  // console.log(imageUrl);

  // const setAll = () => {
  //   setIsOpen(true);
  //   setImageUrl(peq.image);
  // };

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    urlParam.set("searchTerm", searchTerm);

    const fetchPeqies = async () => {
      try {
        setIsLoading(true);
        const searchQuery = urlParam.toString();
        const res = await fetch(`/api/post/getpeqs?${searchQuery}`);
        const data = await res.json();

        if (!res.ok) {
          setIsLoading(false);
          alert("Bad request");
        }
        if (res.ok) {
          // const timeout = setTimeout(() => {
          setPeqies(data.peqs);
          setIsLoading(false);
          // }, 3000);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPeqies();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParam = new URLSearchParams(location.search);
    urlParam.set("searchTerm", searchTerm);

    const searchQuery = urlParam.toString();
    navigate(`/questions?${searchQuery}`);
  };

  const handleShowMore = async () => {
    setIsLoading(true);
    const numOfPeqies = peqies.length;
    const startIndex = numOfPeqies;
    const urlParam = new URLSearchParams(location.search);

    urlParam.set("startIndex", startIndex);
    const searchQuery = urlParam.toString();

    const res = await fetch(`/api/post/getpeqs?${searchQuery}`);

    if (!res.ok) {
      setIsLoading(false);
      alert("failed to retrieve information");
      return;
    }
    if (res.ok) {
      setIsLoading(false);
      const data = await res.json();
      setPeqies([...peqies, ...data.peqs]);
      if (data.peqs.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

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
        <div className=' w-full sticky top-[0.3px] z-[100] shadow-lg'>
          {/* <form
            onSubmit={handleSubmit}
            className=' flex flex-row 
           px-2'>
            <div className=' w-[100%]'>
              {/* <label> Department: </label>
            <input type='text' id='Dept' placeholder='Search...' />
          </div>
          <div className='search-form-div-items'>
            <label> Course Code </label> 
              <input
                type='text'
                id='courseCode'
                placeholder='Search...'
                className='input-text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className='bg-[#333] w-[100px] text-white font-semibold
             '>
              Search
            </button>
          </form> */}
        </div>
        {isLoading ? (
          <>
            <div
              className='min-h-screen mx-auto max-w-3xl  flex justify-center
            items-center'>
              <p className=' text-xl font-mono'>Loading...</p>
            </div>
          </>
        ) : (
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
                {showMore && (
                  <button
                    className='text-xl text-teal-400
                                 hover:underline p-7 w-full text-center'
                    onClick={handleShowMore}>
                    Show more
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
