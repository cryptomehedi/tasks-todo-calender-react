import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const location = useLocation()
    const from = location.state?.from?.pathname || "/todo";
    const navigate = useNavigate()

    if(error?.message?.length > 4){
        toast.error(`${error.message.slice(22,error.message.length -2)}`)
    }

    if(user){
        toast.success(`Welcome ${user.user.displayName} 😉`)
        navigate(from, { replace: true })
    }
    return (
        <div>
            <div className="md:flex text-center justify-center items-center">
                <p>----------------------------</p>
                <p>OR</p>
                <p>----------------------------</p>
            </div>
            <button onClick={()=> signInWithGoogle()} className='bg-transparent w-full text-black border-2 hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 active:bg-green-700 px-10 py-2 text-lg leading-5 rounded-full font-semibold hover:text-white cursor-pointer duration-200 mt-3'>Google Login</button>
            {loading && <div className="mt-2 text-center"><Spinner text="Please Wait For Google Login Process...."/></div>}
        </div>
    );
};

export default SocialLogin;