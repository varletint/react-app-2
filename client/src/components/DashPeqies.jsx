import { useEffect, useState } from "react";

export default function DashPeqies() {
  const [peqies, setPeqies] = useState([]);

  useEffect(() => {
    const fetchPeqies = async () => {
      const res = await fetch(`/api/post/getpeqs`);
      if (!res.ok) {
        alert("Failed to retrieve information");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPeqies(data.peqs);
      }
    };
    fetchPeqies();
  }, [peqies]);
  return (
    <div className=' px-3 py-6'>
      {/* DashPeqies */}
      <h1 className='text-center font-medium text-lg'>My Peqies</h1>

      {peqies && peqies.length > 0 ? (
        <ul className='peqies-list'>
          {peqies.map((peq) => (
            <li className='list '>
              <img
                src={peq.image}
                alt={peq.courseTitle}
                className='w-8 h-8 object-cover'
              />
              <div className=' flex gap-[2rem]'>
                <div className='flex flex-col w-[120px] '>
                  <div className='title-bold'>
                    <span className='font-medium'> Course TItle: </span>
                  </div>
                  <span className='course-title line-clamp-2'>
                    {peq.courseTitle}
                  </span>
                </div>
                <div className='flex flex-col justify-normal w-[120px] '>
                  <div className='code-bold'>
                    <span className='font-medium'> Course Code: </span>
                  </div>
                  <span>{peq.courseCode} </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <li className='flex items-center gap-[10px] '> No peqies</li>
      )}
    </div>
  );
}
