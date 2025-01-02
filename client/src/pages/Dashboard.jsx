import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPeqies from "../components/DashPeqies";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const tabParams = new URLSearchParams(location.search);
    const tabFromUrl = tabParams.get("tab");
    // console.log(tabFromUrl);

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className=' min-h-screen max-w-lg mx-auto py-3 '>
      <div
        className=' flex  flex-col
    '>
        <div
          className='   h-[4rem] flex justify-center sticky top-[.1px] z-[10]
        bg-white border-b-2
        '>
          <DashSidebar />
        </div>
        {tab === "profile" && <DashProfile />}
        {tab === "my-peqies" && <DashPeqies />}
      </div>
    </div>
  );
}
