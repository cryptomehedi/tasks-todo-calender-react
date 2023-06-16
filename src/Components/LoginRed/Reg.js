import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Spinner from '../Shared/Spinner';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';

const Reg = () => {
    const [ createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, error1] = useUpdateProfile(auth);
    const [nameErr, setNameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passErr, setPassErr] = useState('')
    const [cPassErr, setCPassErr] = useState('')
    const [check, setCheck] = useState(false)

    const location = useLocation()
    const from = location.state?.from?.pathname || "/profile";
    const navigate = useNavigate()
    const clear = () => {
        setNameErr('')
        setEmailErr('')
        setPassErr('')
        setCPassErr('')
    }

    const handleSubmit = async e => {
        e.preventDefault();
        clear()
        const displayName = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirm = e.target.ConfirmPassword.value
        if(displayName.length < 1){
            clear()
            setNameErr('Name Must Be Required')
        } else if(email.length < 1){
            clear()
            setEmailErr('Email Must Be Required')
        } else if(password.length < 1){
            clear()
            setPassErr('Password Must Be Required')
        } else if(password.length < 6) {
            clear()
            setPassErr('Password Must Be 6 Characters')
        }else if(confirm.length < 1){
            clear()
            setCPassErr('Confirm Password Must Be Required')
        }else if(displayName.length > 0 && email.length > 0 && password.length > 5){
            if(password === confirm) {
                await createUserWithEmailAndPassword(email, password)
                await updateProfile({displayName})
            }else{
                clear()
                setCPassErr('password did not match')
            }
        }
    }
    if(error?.message?.length > 4){
        toast.error(`${error.message.slice(22,error.message.length -2)}`)
    }
    if(error1?.message?.length > 4){
        toast.error(`${error1.message.slice(22,error1.message.length -2)}`)
    }
    if(user){
        toast.success(`welcome ${user.user.displayName}`)
        navigate(from, { replace: true })
    } 
    return (
        <div className="flex justify-center mt-10">
            <div className='md:w-96'>
                <h2 className='text-2xl text-center text-green-400 font-bold'>Registration</h2>
                <form className='mt-3' onSubmit={handleSubmit}>
                    <div>
                        <h5 className='text-base font-medium'>Name</h5>
                        <input className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500' type="text" name="name" id="name" placeholder='e.g Jhon Smith' />
                        {nameErr && <p className='text-red-500 text-sm'>{nameErr}</p>}
                    </div>
                    <div>
                        <h5 className='text-base font-medium'>Email</h5>
                        <input className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500' type="email" name="email" id="email" placeholder="e.g example@gmail.com" />
                        {emailErr && <p className='text-red-500 text-sm'>{emailErr}</p>}
                    </div>
                    <div>
                        <h5 className='text-base font-medium'>Password</h5>
                        <input className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500' type="password" name="password" id="password" placeholder="Password" />
                        {passErr && <p className='text-red-500 text-sm'>{passErr}</p>}
                    </div>
                    <div>
                        <h5 className='text-base font-medium'>Confirm Password</h5>
                        <input className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500' type="password" name="ConfirmPassword" id="ConfirmPassword" placeholder="Confirm Password" />
                        {cPassErr && <p className='text-red-500 text-sm'>{cPassErr}</p>}
                    </div>
                    {/* <input type="checkbox" /> */}
                    <div className="flex items-center mt-1" >
                        <input onClick={()=> setCheck(!check)} id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-600">I agree with the <span className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</span>.</label>
                    </div>
                    <input disabled={!check} className={!check ? 'bg-transparent text-black border-2 cursor-not-allowed hover:bg-gray-400 px-5 py-2 text-sm leading-5 rounded-full font-semibold duration-200 mt-3' : 'bg-transparent text-black border-2 hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 active:bg-green-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold hover:text-white cursor-pointer duration-200 mt-3'} type="submit" value="Sign Up" />
                    {loading && <div className="mt-2"><Spinner text="Please Wait For Registration Process...."/></div>}
                    {updating && <div className="mt-2"><Spinner text="Please Wait For Registration Process...."/></div>}
                </form>
                <h3 className='mt-3'>Already Registered! Please <Link className='text-green-400' to="/Login"> Login Here</Link></h3>
                <SocialLogin/>
            </div>
        </div>
    );
};

export default Reg;