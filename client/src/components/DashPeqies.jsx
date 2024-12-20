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
            <li className='flex items-center gap-[100px] '>
              {peq.courseTitle}
            </li>
          ))}
        </ul>
      ) : (
        <li className='flex items-center gap-[10px] '> No peqies</li>
      )}
    </div>
  );
}
