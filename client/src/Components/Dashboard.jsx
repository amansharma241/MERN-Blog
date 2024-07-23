import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSideBar from './Dashboard/DashSideBar';
import DashProfile from './Dashboard/DashProfile';
import DashPosts from './Dashboard/DashPosts';

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if(tabParam) setTab(tabParam)
  }, [location.search])
  return (
    <div className=' min-h-screen flex flex-col md:flex-row'>
      {/* left side of the dasboard */}
      <div >
          <DashSideBar/>
      </div>

      {/* profile... */}
      <div>
        {tab==='profile' && <DashProfile/>}
      </div>
      <div>
        {tab ==='posts' && <DashPosts/>}
      </div>
    </div>
  )
}

export default Dashboard