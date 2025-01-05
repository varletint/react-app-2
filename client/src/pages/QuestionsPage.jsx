import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import PicturePreviewModal from "../components/PicturePreviewModal";
import DashSidebar from "../components/DashSidebar";
import buyMeACoffee from "../assets/images/buycoffee.png";
import computerImg from "../assets/images/download.jpeg";
import mathsImg from "../assets/images/maths.jpeg";
import chemisrtyImg from "../assets/images/chemistry.jpeg";
import phyImg from "../assets/images/phy1.jpeg";

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

  const fechPassQs = async (
    /*page = pageRef.current,*/ isFetchingFirstTIme
  ) => {
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
      fechPassQs();
      // fechPassQs(pageRef.current + 1);
      // pageRef.current = pageRef.current + 1;
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
        <div className=' h-[4rem] flex justify-center sticky top-[.1px] z-[10] bg-white border-b-2'>
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
          <>
            {/* Support the creator */}

            <div className='mt-[2rem] max-w-3xl mx-auto  p-2 '>
              <div className=''>
                <div className=''>
                  <p className=' font-semibold p-2 text-lg'>Support me</p>
                </div>
                <div className='w-full h-[11rem] sm:h-[15rem] coffee'>
                  <img
                    src={buyMeACoffee}
                    alt='Buy me a Coffee'
                    className=' w-full h-full object-cover rounded-xl'
                  />
                </div>
              </div>
            </div>
            <div className='mt-[2rem] max-w-3xl mx-auto  p-2 '>
              <div className=' font-semibold p-2'>
                <p>Departments</p>
              </div>
              <div
                className='scroll w-full h-[11rem] bg-[#f3f3f3] 
              p-6 box-border items-center flex gap-[10px]
               justify-start sm:justify-around sm:overflow-x-hidden
                rounded-xl'>
                <div className='scroll-items'>
                  <img
                    className='dept-image w-full h-full object-cover relative'
                    h
                    src={computerImg}
                    alt='Computer science'
                  />
                </div>
                <div className='scroll-items'>
                  <img
                    className='dept-image w-full h-full object-cover relative'
                    h
                    src={mathsImg}
                    alt='Maths logo'
                  />
                </div>
                <div className='scroll-items'>
                  <img
                    className='dept-image w-full h-full object-cover relative'
                    h
                    src={phyImg}
                    alt='Physics logo'
                  />
                </div>
                <div className='scroll-items'>
                  <img
                    className='dept-image w-full h-full object-cover relative'
                    h
                    src={chemisrtyImg}
                    alt='Chemistry image'
                  />
                </div>
              </div>
            </div>
            <div className='questions-container min-h-[100vh] mt-3 pr-2 pl-2 mb-8'>
              {peqies && peqies.length > 0 && (
                <div className=''>
                  <div className=''>
                    <h1 className=' p-2 font-semibold text-lg'>Peqs</h1>
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
          </>
        )}
      </div>
    </>
  );
}
