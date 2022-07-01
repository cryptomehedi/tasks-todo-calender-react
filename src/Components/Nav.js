import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <div className="flex justify-center mt-2">
                <Link to='/' className='mx-2 text-xl font-semibold hover:bg-green-400 px-1 rounded'>Task</Link>
                <Link to='/todo' className='mx-2 text-xl font-semibold hover:bg-green-400 px-1 rounded'>ToDo List</Link>
                <Link to='/cal' className='mx-2 text-xl font-semibold hover:bg-green-400 px-1 rounded'>Calender</Link>
            </div>
        </div>
    );
};

export default Nav;