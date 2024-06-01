import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className=' flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

        {/* div for left side */}
        <div className="flex-1">
          <Link to="/" className=' font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>Ashley's</span>
            Blog
          </Link>
          <p className='mt-3 font-semibold '>Welcome to my blog. Please signup with your email and password or Google.</p>
        </div>

        {/* div for right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Username '></Label>
              <TextInput type='text' placeholder='Username' id='username'></TextInput>
            </div>
            <div>
              <Label value='Your email'></Label>
              <TextInput type='text' placeholder='Email' id='email'></TextInput>
            </div>
            <div>
              <Label value='Your password '></Label>
              <TextInput type='text' placeholder='Password' id='password'></TextInput>
            </div>
            <Button gradientDuoTone= 'purpleToPink' >Sign Up</Button>
          </form>
          <div className='flex gap-1 mt-2 text-sm'>
            <span>Have an account?</span>
            <Link className='text-blue-500' to='/signin'>Sign-In</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp