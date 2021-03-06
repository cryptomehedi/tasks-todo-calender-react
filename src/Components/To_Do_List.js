import axios from 'axios';
import React, { useState } from 'react';
import { PencilAltIcon } from '@heroicons/react/solid'
import { useQuery } from 'react-query'

const To_Do_List = () => {

    // const [tasks, setTasks] = useState([])
    const [taskEdit, setTaskEdit] = useState({}) 

    const {data, isLoading, error, refetch} = useQuery('task', ()=> axios.get('https://todotasklistapi.herokuapp.com/task'))

    //console.log(taskEdit);
    const handleSubmit = async e => {
        e.preventDefault()
        const id = taskEdit._id
        const task = e.target.task.value
        await axios.put(`https://todotasklistapi.herokuapp.com/task/${id}`, {task})
        e.target.reset()
        setTaskEdit(null)
        refetch()
    }
// console.log(checked);

    const handelChecked = async id =>{ 
        const status = 1
        await axios.put(`https://todotasklistapi.herokuapp.com/taskComplete/${id}`, {status})
        .then(data=> console.log(data))
        refetch()
    }


    return (
        <div className=''>
            <div className='flex justify-center py-2'>
                <form className='flex justify-center' onSubmit={handleSubmit}> 
                    <input disabled={taskEdit?.task ? false : true}  defaultValue={taskEdit?.task} className={`form-control w-60 mr-5 block px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${taskEdit.task ? '' : 'disabled:cursor-not-allowed'}`} type="text" name="task" id="task" />
                    <input disabled={taskEdit?.task ? false : true} className={`bg-gray-300 mt-2 p-2  rounded-lg w-20 hover:bg-slate-500 hover:text-white hover:font-medium ${taskEdit?.task ? '' : 'disabled:cursor-not-allowed'}`} type="submit" value="Submit" />
                </form>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div >
                <p className='text-2xl font-semibold text-red-400 text-center'>Incompleted Task</p>
                    <div className='flex justify-center'> 
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full">
                                            <thead className="bg-white border-b">
                                                <tr>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        #
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Checked
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Task
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Edit
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.data.map((task, i) => task.status ===1 ? '' : <tr key={i} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <input onClick={()=>handelChecked(task._id)} type="checkbox" name="complete" id="complete" />
                                                    </td>
                                                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                                                        {task.task}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <PencilAltIcon onClick={()=>setTaskEdit(task)} className="h-5 w-5 text-green-300 hover:text-green-500"/>
                                                    </td>
                                                </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div>
                    <p className='text-2xl font-semibold text-green-400 text-center'>Completed Task</p>
                    <div className='flex justify-center'> 
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full">
                                            <thead className="bg-white border-b">
                                                <tr>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        #
                                                    </th> 
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Task
                                                    </th> 
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.data.map((task, i) => task.status !==1 ? '' : <tr key={i} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                                                    
                                                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                                                        {task.task}
                                                    </td> 
                                                </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default To_Do_List;