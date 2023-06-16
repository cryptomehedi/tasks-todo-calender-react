import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const Nav = () => {

    const [user] = useAuthState(auth)
    return (
        <div>
            <div className="flex justify-center mt-2">
                <Link to='/' className='mx-2 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>Task</Link>
                <Link to='/todo' className='mx-2 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>ToDo List</Link>
                <Link to='/cal' className='mx-2 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>Calender</Link>
                {
                    user ? <button className='mx-2 p-2  rounded-xl bg-gradient-to-r from-slate-400 to-red-300 hover:text-white duration-150 hover:from-red-300 hover:to-red-600' onClick={() =>signOut(auth)}>sign out</button> :
                    <Link to='/login' className='mx-2 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>Login</Link>
                }
                
            </div>
        </div>
    );
};

export default Nav;