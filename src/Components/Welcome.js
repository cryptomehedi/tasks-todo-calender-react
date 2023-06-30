import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Welcome = () => {
    const [user] = useAuthState(auth)
    const {displayName} = user

    return (
        <div>
            <h1 className='text-center text-2xl mb-3'>Hello <span className='text-green-400 font-semibold'>{displayName}</span></h1>
        </div>
    );
};

export default Welcome;