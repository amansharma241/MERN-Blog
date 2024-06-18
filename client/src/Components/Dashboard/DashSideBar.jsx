import { Sidebar } from 'flowbite-react'
import React, { useState,useEffect } from 'react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const DashSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const {currentUser} = useSelector(state=>state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if(tabParam) setTab(tabParam)
  }, [location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link to='/dashboard?tab=profile'>
              <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin? 'Admin' : 'User'} labelColor='dark' className='cursor-pointer' >
                Profile
                </Sidebar.Item>
              </Link>
              <Sidebar.Item  icon = {HiArrowSmRight} className='cursor-pointer'>
                Sign-Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar