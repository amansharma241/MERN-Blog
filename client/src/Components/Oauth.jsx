import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { signinSuccess, signinStart, signinFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function Oauth() {
    const auth = getAuth(app);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            dispatch(signinStart())
            const resultFromGoogle = await signInWithPopup(auth, provider)
            console.log(resultFromGoogle.user.displayName)
            const res = await fetch('http://localhost:3000/user/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    photoURL: resultFromGoogle.user.photoURL
                })
            })
            const data = await res.json();
            console.log(data)
            if (res.ok) {
                console.log("it was okay")
                dispatch(signinSuccess(data))
                navigate('/')
            }
            else{
                dispatch(signinFailure(data.message))
              }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button typeof='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            Continue with Google
            <AiFillGoogleCircle className='h-6 w-6 ml-2' />
        </Button>
    )
}

export default Oauth