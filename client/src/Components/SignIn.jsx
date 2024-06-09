import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { set } from 'mongoose';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [formdata, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      return setErrors("Please fill out all the fields.");
    }
    try {
      
      setErrors(null);
      const res = await fetch('http://localhost:3000/user/auth/signin',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(formdata)
        }
      );
      const data = await res.json();
      //console.log(data)
      setLoading(false)
      if(res.ok){
        setErrors("Sign-in success")
        setTimeout(() => {
          navigate('/')
        }, 1000);
      }
    } catch (error) {
      setErrors(error.message)
    }
  };
 
  return (
    <div className='min-h-screen mt-20'>
      <div className=' flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

        {/* div for left side */}
        <div className="flex-1">
          <Link to="/" className=' font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>Ashley's</span>
            Blog
          </Link>
          <p className='mt-3 font-semibold '>Welcome to my blog. Please sign-in with your email and password or Google.</p>
        </div>

        {/* div for right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' >
           
            <div>
              <Label value='Your email'></Label>
              <TextInput type='text' placeholder='Email' id='email' onChange={handleChange}></TextInput>
            </div>
            <div>
              <Label value='Your password '></Label>
              <TextInput type='text' placeholder='Password' id='password' onChange={handleChange}></TextInput>
            </div>
            <Button gradientDuoTone='purpleToPink' onClick={handleSubmit} >
              {loading? (
                <>
                <Spinner size='sm'/>
                <span className='pl-4'>Loading...</span>
                </>
              ) : 'Sign In'}

            </Button>
          </form>
          <div className='flex gap-1 mt-2 text-sm'>
            <span>Don't have an account?</span>
            <Link className='text-blue-500 hover:underline' to='/signup' >Sign-Up</Link>
          </div>
          {errors && ( 
           <Alert className='mt-5' color={errors==="Sign-in success"? 'success':'failure'}>{errors}</Alert>)
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn