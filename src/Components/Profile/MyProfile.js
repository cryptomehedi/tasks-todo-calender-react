import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth)
    const {displayName,photoURL, email,metadata} = user
    console.log(user);
    return (
        <div>
            <div className='flex justify-center'>
                {
                    photoURL && <img src={photoURL} className='rounded-full' alt="" srcSet="" />
                }
            </div>
            <div className='text-center'>
                <p>Your Name: {displayName}</p>
                <p>Your Email: {email}</p>
                <p>Joining Date: {metadata?.creationTime}</p>
                <p>Last Login Time: {metadata?.lastSignInTime}</p>
            </div>
        </div>
    );
};

export default MyProfile;