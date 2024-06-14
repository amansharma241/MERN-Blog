import React from 'react'
import {useSelector} from 'react-redux';
import {Button, TextInput} from 'flowbite-react'

const DashProfile = () => {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='font-semibold text-3xl text-center mt-5 mb-5'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className="w-32 h-32 self-center shadow-md overflow-hidden rounded-full">
            <img src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput type='password' id='password' placeholder='password' />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
        </form>
        <div className ='text-red-500 flex justify-between mt-3'>
            <span>Delete Account</span>
            <span>Signout</span>
        </div>
    </div>
  )
}

export default DashProfile