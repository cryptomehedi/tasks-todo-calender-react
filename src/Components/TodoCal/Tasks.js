import axios from 'axios';
import React, { useState } from 'react';
import Spinner from '../Shared/Spinner';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Welcome from '../Welcome';
import { toast } from 'react-toastify';

const Tasks = () => {
    const [loading, setLoading] = useState(null)
    const [{email}] = useAuthState(auth)
    const [user] = useAuthState(auth)

    const handleSubmit = async e => {
        setLoading(1)
        e.preventDefault();
        const task = e.target.task.value 
        if(task.length > 0) {
            await axios.post('https://tasks-todo-calender-modern-server.vercel.app/api/task', {task, email})
            .then(data => {
                if (data.status === 200) {
                    setLoading(null)
                    
                    toast.success("Task Added");
                    e.target.reset()
                }
            })
        }
        setLoading(null)
    }

    

    return (
        <div>
            {
                user ? <Welcome/> : <></>
            }
            <div className='mx-5'>
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="task" className="form-label inline-block mb-2 text-gray-700">Write a task here</label>
                        <input className='form-control lg:w-[500px] block px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' type="text" name="task" id="task" />
                        <input className='bg-gray-300 md:w-full mt-2 lg:mb-20 p-2 rounded-lg w-full hover:bg-slate-500 hover:text-white hover:font-medium' type="submit" value="Submit" />
                    </form>
                    
                </div>
            </div>
            {loading && <div className="mt-2 text-center"><Spinner text="Please Wait Your Submit is Processing...."/></div>}
        </div>
    );
};

export default Tasks;