import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import './Nav.css'

const Nav = () => {

    const [user] = useAuthState(auth)
    return (
        <div>
            <div className="flex justify-center mt-2">
                <Link to='/' className='mx-2 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>Task</Link>
                <Link to='/todo' className='mx-2 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>ToDo List</Link>
                <Link to='/calender' className='mx-2 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>Calender</Link>
                {
                    user ? <div className="dropdown inline-block relative hover:bg-gray-200 rounded-t-xl">
                                <button className="hover:bg-green-400 hover:text-white  rounded-xl font-semibold py-2 px-4 inline-flex items-center">
                                <span className="mr-1">Profile</span>
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                                </button>
                                <ul className="dropdown-menu absolute hidden bg-gray-200 rounded-b-xl w-full text-gray-700 pt-1">
                                    <li className="mb-3"><Link to='/profile' className='m-2 w-16 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>Profile</Link></li>
                                    <li className=""><button className='mx-2 p-2  rounded-xl bg-gradient-to-r from-slate-400 to-red-300 hover:text-white duration-150 hover:from-red-300 hover:to-red-600' onClick={() =>signOut(auth)}>sign out</button></li>
                                </ul>
                            </div> :
                    <Link to='/login' className='mx-2 p-2 duration-150 hover:bg-green-400 rounded-xl hover:text-white'>Login</Link>
                }
                
            </div>
        </div>
    );
};

export default Nav;