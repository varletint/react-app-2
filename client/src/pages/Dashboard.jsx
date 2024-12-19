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
    <div className=' min-h-screen max-w-lg mx-auto  '>
      <div
        className=' flex  flex-col
    '>
        <div
          className='   sticky top-0 shadow-sm
        '>
          <DashSidebar />
        </div>
        {tab === "profile" && <DashProfile />}
        {tab === "my-peqies" && <DashPeqies />}
      </div>
    </div>
  );
}
