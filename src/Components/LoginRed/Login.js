import React, { useRef, useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';
import { toast } from 'react-toastify';
import SocialLogin from './SocialLogin';

const Login = () => { 
    const [ signInWithEmailAndPassword, user, loading, error, ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, error2] = useSendPasswordResetEmail(  auth );
    const [passErr, setPassErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const inputEmail = useRef('')

    const location = useLocation()
    const from = location.state?.from?.pathname || "/profile";
    const navigate = useNavigate()


    const handleSubmit = async e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        setEmailErr('')
        setPassErr('')
        if(email.length < 1){
            setEmailErr('Your Email Field is Required') 
            setPassErr('')
        } 
        else if(password.length < 6){
            if(password.length < 1){
                setEmailErr('')
                return setPassErr('Your Password Field is Required')
            }
            setEmailErr('')
            setPassErr('Password Must Be 6 Characters')
        }else if(email.length > 0 && password.length > 5){
            
            await signInWithEmailAndPassword(email, password)
        }
    }
    const handlePasswordChange = async () => {
        const email= inputEmail.current.value
        if(email.length > 0) {
            console.log("first")
            await sendPasswordResetEmail(email)
        } else{
            toast.warn('Please enter your email')
        }
    }
    
    if(error2?.message?.length < 1){
        toast.success('Email send Please Check.. 😊')
    }
    
    if(error2?.message?.length > 4){
        toast.error(`${error2.message.slice(22,error2.message.length -2)}`)
    }
    if(error?.message?.length > 4){
        toast.error(`${error.message.slice(22,error.message.length -2)}`)
    }
    
    if(user){
        toast.success(`Welcome Back ${user.user.displayName} 😉`)
        navigate(from, { replace: true })
    }
    return (
        <div className="flex justify-center mt-10">
            <div>
                <div className='md:w-96'>
                    <h2 className='text-2xl text-center text-green-400 font-bold'>Login</h2>
                    <form className='mt-3' onSubmit={handleSubmit}>
                        <div className=''>
                            <h5 className='text-base font-medium'>Email</h5>
                            {/* <input className='px-3 py-2 rounded-xl border border-green-100 hover:border-blue-300 outline-none focus:ring focus:ring-violet-300' type="email" name="email" id="email" placeholder="e.g example@gmail.com" /> */}
                            <input  ref={inputEmail} className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500' type="email" name="email" id="email" placeholder="e.g example@gmail.com" />
                            {emailErr && <p className='text-red-500 text-sm'>{emailErr}</p>}
                        </div>
                        <div className='my-2'>
                            <h5 className='text-base font-medium'>Password</h5>
                            <input className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none' type="password" name="password" id="password" placeholder="Password" />
                            {passErr && <p className='text-red-500 text-sm'>{passErr}</p>}
                        </div>
                        <p onClick={() => handlePasswordChange()} className="text-red-400 cursor-pointer">Forget Password??</p>
                        <input className='bg-transparent text-black border-2 hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 active:bg-green-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold hover:text-white cursor-pointer duration-200 mt-3' type="submit" value="Sign In" />
                    </form>
                    {loading && <div className="mt-2"><Spinner text="Please Wait For Login Process...."/></div>}
                    {sending && <div className="mt-2"><Spinner text="Please Wait For Password Reset Process...."/></div>}
                    {/* {error && <div className="mt-2 text-red-500 font-semibold capitalize ">{error.message.slice(22,error.message.length -2)}</div>} */}
                    {/* {error2 && <div className="mt-2 text-red-500 font-semibold capitalize ">{error2.message}</div>} */}
                    <h3 className='mt-3'>New Here ? Please <Link className='text-green-400' to="/registration"> Register Here</Link></h3>
                </div>
                <SocialLogin/>
            </div>
        </div>
    );
};

export default Login;