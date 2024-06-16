import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {Button, Modal, TextInput} from 'flowbite-react'
import { updateFailure, updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashProfile = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state=>state.user);
  const [formData,setFormData] = useState({});
  const [showModal,setShowModal] = useState(false);
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id] : e.target.value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(Object.keys(formData).length === 0) return;
    try {
      const res = await fetch(`http://localhost:3000/user/api/update/${currentUser._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type' : "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(!res.ok) dispatch(updateFailure(data.message))
      else dispatch(updateSuccess(data))
    } catch (error) {
      dispatch(updateFailure(error))
    }
  }
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:3000/user/api/delete/${currentUser._id}`, {
        method: 'DELETE',
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
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='font-semibold text-3xl text-center mt-5 mb-5'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className="w-32 h-32 self-center shadow-md overflow-hidden rounded-full">
            <img src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
            <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
        </form>
        <div className ='text-red-500 flex justify-between mt-3'>
            <span onClick={()=>{setShowModal(true)}} className='cursor-pointer hover:underline'>Delete Account</span>
            <span className='cursor-pointer hover:underline'>Signout</span>
        </div>
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