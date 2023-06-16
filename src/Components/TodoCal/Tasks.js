import axios from 'axios';
import React, { useState } from 'react';
import Spinner from '../Shared/Spinner';

const Tasks = () => {
    const [loading, setLoading] = useState(null)
    const handleSubmit = async e => {
        setLoading(1)
        e.preventDefault();
        const task = e.target.task.value 
        if(task.length > 0) {
            await axios.post('https://tasks-todo-calender.vercel.app/task', {task})
            .then(data => {
                if (data.status === 200) {
                    setLoading(null)
                    e.target.reset()
                }
            })
        }
        setLoading(null)
    }

    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="task" className="form-label inline-block mb-2 text-gray-700">Write a task here</label>
                    <input className='form-control w-96 block px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' type="text" name="task" id="task" />
                    <input className='bg-gray-300 mt-2 p-2 rounded-lg w-40 hover:bg-slate-500 hover:text-white hover:font-medium' type="submit" value="Submit" />
                </form>
                
            </div>
            {loading && <div className="mt-2 text-center"><Spinner text="Please Wait Your Submit is Processing...."/></div>}
        </div>
    );
};

export default Tasks;