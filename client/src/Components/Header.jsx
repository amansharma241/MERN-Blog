import React from 'react';
import { Button, Breadcrumb, Navbar, TextInput, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from 'react-icons/fa'
import SignIn from './SignIn';
import { useSelector,useDispatch } from 'react-redux';
import { toggletheme } from '../redux/theme/themeSlice';
import {signOut} from '../redux/user/userSlice'

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate()
  const handleSignOut = () =>{
    dispatch(signOut());
    navigate('/signin')
  }
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>Ashley's</span>
        Blog
      </Link>

      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>

      <Button color='gray' className='lg:hidden hover:shadow-lg' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2 '>
        <Button color='gray' className='w-12 h-10 hover:shadow-lg sm:inline ' pill onClick={()=>dispatch(toggletheme())}>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar img={currentUser.profilePicture} rounded />
          } >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to={'/dashboard?tab=profile'}> Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleSignOut} >
              <Link to={'/dashboard?tab=profile'}> SignOut
              </Link>
            </Dropdown.Item>
          </Dropdown>
        ) :
          <Link to="/signin">
            <Button color='gray' className='hover:shadow-lg' pill>
              SignIn
            </Button>
          </Link>
        }
        <Navbar.Toggle />
      </div >
      <Navbar.Collapse >
        <Navbar.Link active={path === '/'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar >
  )
}

export default Header