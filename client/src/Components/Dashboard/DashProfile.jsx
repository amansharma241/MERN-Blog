import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, TextInput, Alert } from 'flowbite-react'
import { updateFailure, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess } from '../../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {Link} from 'react-router-dom';


const DashProfile = () => {
  const dispatch = useDispatch()
  const { currentUser, error } = useSelector(state => state.user);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  console.log(currentUser)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) return;
    try {
      const res = await fetch(`http://localhost:3000/user/api/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message);
      }
      else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  }
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:3000/user/api/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('http://localhost:3000/user/api/signout', {
        method: 'POST',
      })
      const data = await res.json()
      if (res.ok) dispatch(signOutSuccess())
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='font-semibold text-3xl text-center mt-5 mb-5'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className="w-32 h-32 self-center shadow-md overflow-hidden rounded-full">
          <img src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Create a post
            </Button>
          </Link>
)} 
      </form>
      <div className='text-red-500 flex justify-between mt-3'>
        <span onClick={() => { setShowModal(true) }} className='cursor-pointer hover:underline'>Delete Account</span>
        <span onClick={handleSignOut} className='cursor-pointer hover:underline'>Signout</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile