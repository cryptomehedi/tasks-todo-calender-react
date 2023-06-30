import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [{displayName,photoURL, email,metadata}] = useAuthState(auth)
    
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