import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Welcome = () => {
    const [user] = useAuthState(auth)
    console.log(user);
    const {displayName} = user

    return (
        <div>
            <h1>Hello {displayName}</h1>
        </div>
    );
};

export default Welcome;