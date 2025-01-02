import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import PicturePreviewModal from "../components/PicturePreviewModal";
import DashSidebar from "../components/DashSidebar";

export default function QuestionsPage() {
  const [peqies, setPeqies] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [isSpinnerRef, setIsSpinnerRef] = useState(false);
  const spinnerRef = useRef();
  const lastElementRef = useRef();

  const [isInteracting, setIsInteracting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef(1);
  const limit = 10;

  const fechPassQs = async (page = pageRef.current, isFetchingFirstTIme) => {
    try {
      isFetchingFirstTIme && setIsLoading(true);
      setIsError(false);

      // const res = await fetch(
      //   `/api/post/getpeqs?limit=${limit}&startIndex=${(page - 1) * limit}`
      // );
      const numOfPeqies = peqies.length;
      const startIndex = numOfPeqies;
      const urlParam = new URLSearchParams(location.search);

      urlParam.set("startIndex", startIndex);
      const searchQuery = urlParam.toString();

      const res = await fetch(`/api/post/getpeqs?${searchQuery}`);

      // const data = await res.json();

      // //   if (Array.isArray(data.peqs) && data.peqs.length) {
      // //     setPeqies((prevPeqs) => {
      // //       const newPeqs = [...prevPeqs, ...data.peqs];
      // //       console.log(data.totalPeqs);

      // //       if (newPeqs.length < data.totalPeqs) {
      // //         setShowMore(true);
      // //       } else {
      // //         setShowMore(false);
      // //       }
      // //       return newPeqs;
      // //     });
      // //   } else {
      // //     setShowMore(false);
      // //   }
      // setPeqies([...peqies, ...data.peqs]);
      // if (data.peqs.length < data.totalPeqs) {
      //   setShowMore(true);
      // } else {
      //   setShowMore(false);
      // }

      // setPeqies(data.peqs);
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
    } catch (error) {
      setShowMore(false);
      setIsError(true);
    } finally {
      isFetchingFirstTIme && setIsLoading(false);
    }
  };

  useEffect(() => {
    fechPassQs(true);
  }, [location.search]);

  useEffect(() => {
    const ref = spinnerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInteracting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "10px",
        threshold: 1,
      }
    );

    if (ref) {
      observer.observe(ref);
    }
    return () => {
      ref && observer.unobserve(ref);
    };
  }, [isSpinnerRef]);

  useEffect(() => {
    if (isInteracting) {
      fechPassQs(pageRef.current + 1);
      pageRef.current = pageRef.current + 1;
    }
  }, [isInteracting]);

  //   useEffect(() => {
  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         setIsInteracting(entry.isIntersecting);
  //       },
  //       {
  //         root: null,
  //         rootMargin: "0px",
  //         threshold: 1,
  //       }
  //     );

  //     if (spinnerRef.current) {
  //       observer.observe(spinnerRef.current);
  //     }

  //     return () => {
  //       if (spinnerRef.current) {
  //         observer.unobserve(spinnerRef.current);
  //       }
  //     };
  //   }, [spinnerRef]);
  // console.log(isInteracting);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParam = new URLSearchParams(location.search);
    urlParam.set("searchTerm", searchTerm);

    const searchQuery = urlParam.toString();
    navigate(`/pass-q?${searchQuery}`);
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
        <div className=''>
          <DashSidebar />
        </div>
        {/* <div className='bg-[#fff8f870] bg-blur sticky top-[0px] p-3  h-[5rem] '>
          <div className='  w-full sticky z-[100] shadow-lg'>
            <form
              onSubmit={handleSubmit}
              className=' flex flex-row 
           px-2'>
              <div className=' w-[100%]'>
                {/* <label> Department: </label>
            <input type='text' id='Dept' placeholder='Search...' />
          </div>
          <div className='search-form-div-items'>
            
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
            </form>
          </div>
        </div> */}
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
                <div className='questions-grid  '>
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
                </div>{" "}
                {showMore && (
                  <div
                    ref={(el) => {
                      spinnerRef.current = el;
                      setIsSpinnerRef((prev) => !prev);
                    }}>
                    <p className=' text-center mt-5 text-xl font-mono'>
                      Loading...
                    </p>
                  </div>
                )}
                {/* {showMore && (
                  <button
                    className='text-xl text-teal-400
                                 hover:underline p-7 w-full text-center'
                    onClick={handleShowMore}>
                    Show more
                  </button>
                )} */}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
