import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PencilAltIcon } from '@heroicons/react/solid'
import { useQuery } from 'react-query'

const To_Do_List = () => {

    // const [tasks, setTasks] = useState([])
    const [taskEdit, setTaskEdit] = useState({})

    const {data, isLoading, error, refetch} = useQuery('task', ()=> axios.get('http://localhost:4000/task'))

    //console.log(taskEdit);
    const handleSubmit = async e => {
        e.preventDefault()
        const id = taskEdit._id
        const task = e.target.task.value
        await axios.put(`http://localhost:4000/task/:${id}`, {task})
        e.target.reset()
        setTaskEdit(null)
        refetch()
    }
// console.log(data);

    return (
        <div className=''>
            <div className='flex justify-center py-2'>
                <form className='flex justify-center' onSubmit={handleSubmit}> 
                    <input defaultValue={taskEdit?.task} className='form-control w-60 mr-5 block px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' type="text" name="task" id="task" />
                    <input className='bg-gray-300 mt-2 p-2  rounded-lg w-20 hover:bg-slate-500 hover:text-white hover:font-medium' type="submit" value="Submit" />
                </form>
            </div>
            <div className='flex justify-center'>
                <div className='w-80'>
                    {
                        data?.data?.map(task => <ul key={task._id}>
                            <li className='flex justify-between' > {task.task} <PencilAltIcon onClick={()=>setTaskEdit(task)} className="h-5 w-5 text-green-300 hover:text-green-500"/> </li>
                        </ul>)
                    }
                </div>
            </div>
        </div>
    );
};

export default To_Do_List;