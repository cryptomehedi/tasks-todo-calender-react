import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from './Spinner';

const UseAuth = ({children}) => {
    const [user, loading] = useAuthState(auth)

    let location = useLocation();

    if(loading){
        return <div className='my-48'><div className="flex justify-center "><Spinner/></div></div>
    }

    if(!user) {
        return <Navigate to="/login" state={{from: location}} replace />
    }
    
    return children
};

export default UseAuth;