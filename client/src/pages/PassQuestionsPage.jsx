import { useState, useEffect, useRef } from "react";
import QuestionCard from "../components/QuestionCard";
// import Modal from "../components/Modal";
import PicturePreviewModal from "../components/PicturePreviewModal";
// import { set } from "mongoose";
import { useLocation, useNavigate } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import buyMeACoffee from "../assets/images/buycoffee.png";
import computerImg from "../assets/images/download.jpeg";
import mathsImg from "../assets/images/maths.jpeg";
import chemisrtyImg from "../assets/images/chemistry.jpeg";
import phyImg from "../assets/images/phy1.jpeg";

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
      <div className=' max-w-3xl mx-auto min-h-screen '>
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
          </form>*/}
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
            <div className='questions-container min-h-[100vh] pt-7 pr-2 pl-2 mb-8'>
              {peqies && peqies.length > 0 && (
                <div className=''>
                  <div className=''>
                    <h1 className=' p-2 font-semibold text-lg'>Peqs</h1>
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
          </>
        )}
      </div>
    </>
  );
}
