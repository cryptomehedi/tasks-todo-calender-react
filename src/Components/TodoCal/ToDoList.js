import axios from 'axios';
import React, { useState } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useQuery } from 'react-query'
import Spinner from '../Shared/Spinner';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const To_Do_List = () => {

    const [taskEdit, setTaskEdit] = useState({}) 
    const [errorMessage, setErrorMessage] = useState(false)
    const [user] = useAuthState(auth)
    const {data, isLoading, error, refetch} = useQuery('task', ()=> axios.get(`https://tasks-todo-calender-modern-server.vercel.app/api/task?user=${user.email}`))
    // const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));

    const handleSubmit = async e => {
        e.preventDefault()
        const id = taskEdit._id
        const task = e.target.task.value 
        if(task.length > 0) {
            await axios.put(`https://tasks-todo-calender-modern-server.vercel.app/api/task/${id}`, {task})
            e.target.reset()
            setTaskEdit('')
            toast.success("Task Updated")
            refetch()
            setErrorMessage(false)
        } else {
            setErrorMessage(true)
        }
        
    }

    const handelChecked = async id =>{
        const ids = toast.loading("Please wait...")
        const status = true
        await axios.put(`https://tasks-todo-calender-modern-server.vercel.app/api/task/taskComplete/${id}`, {status})
        // await axios.put(`http://localhost:4000/api/task/taskComplete/${id}`, {status})
        .then(data=> data)
        toast.update(ids, { render: "Task Completed", type: "success", autoClose: 3000, isLoading: false });
        refetch()
    }
    const handelUnChecked = async id =>{
        const ids = toast.loading("Please wait...")
        const status = false
        await axios.put(`https://tasks-todo-calender-modern-server.vercel.app/api/task/taskComplete/${id}`, {status})
        .then(data=> data)
        toast.update(ids, { render: "Task Unchecked", type: "info", autoClose: 3000, isLoading: false });
        refetch()
    }

    const handleDelete = async id =>{
        const ids = toast.loading("Please wait...")
        await axios.delete(`https://tasks-todo-calender-modern-server.vercel.app/api/task/${id}`)
        .then(data=> data)
        toast.update(ids, { render: "Task Deleted", type: "error", autoClose: 3000, isLoading: false });
        refetch()
    }

    return (
        <div className=''>
            
            {
                error && <div className="mt-2 text-center"><Spinner text="Please Wait Your Submit is Processing...."/></div>
            }
            {
                taskEdit._id && <div className='flex justify-center p-2'>
                <form className='flex justify-center' onSubmit={handleSubmit}>
                    <input defaultValue={taskEdit?.task} className='form-control w-60 mr-5 block px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' type="text" name="task" id="task" />
                    <input className='bg-gray-300 mt-2 p-2 cursor-pointer rounded-lg w-20 hover:bg-slate-500 hover:text-white hover:font-medium' type="submit" value="Submit" />

                </form>
            </div>
            }

            {
                errorMessage && <p className='text-center text-red-600 text-lg font-bold'>Can't Submit Empty Field</p>
            }

            {
                isLoading ? <div className="mt-2 text-center"><Spinner text="Please Wait Your Task is Loading...."/></div> :
            
            <div className="grid lg:grid-cols-2 gap-5">
                <div className='' >
                    <p className='text-2xl font-semibold text-red-400 text-center'>In completed Task</p>
                    <div className='flex justify-center'> 
                        <div className="flex flex-col" >
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full ">
                                            <thead className="bg-white border-b">
                                                <tr>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-2 lg:px-6 py-4 text-left">
                                                        #
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-2 lg:px-6 py-4 text-left">
                                                        Checked
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-2 lg:px-6 py-4 text-left">
                                                        Task
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-2 lg:px-6 py-4 text-left">
                                                        Edit
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.data.map((task, i) => task.status !== true && <tr key={i} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="px-2 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                                                    <td className="text-sm text-gray-900 font-light px-2 lg:px-6 py-4 whitespace-nowrap">
                                                        {/* <input onClick={()=>(task._id)} type="checkbox" name="complete" id="complete" /> */}
                                                        <button onClick={()=>handelChecked(task._id)} className='bg-transparent text-green-500 border hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 active:bg-green-700 px-2 py-1 leading-5 rounded-full font-semibold hover:text-white cursor-pointer duration-500 mt-3'>Checked</button>
                                                    </td>
                                                    <td className=" text-gray-900 px-2 lg:px-6 py-4 w-2 whitespace-normal">
                                                        {task.task}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-2 lg:px-6 py-4 whitespace-nowrap">
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
                    <div className='flex justify-center '> 
                        <div className="flex flex-col">
                            <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-5 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full">
                                            <thead className="bg-white border-b">
                                                <tr>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-2 lg:px-6 py-4 text-left">
                                                        #
                                                    </th>
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-2 lg:px-6 py-4 text-left">
                                                        Unchecked
                                                    </th> 
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-2 lg:px-6 py-4 text-left">
                                                        Task
                                                    </th> 
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-2 lg:px-6 py-4 text-left">
                                                        Delete
                                                    </th> 
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.data.map((task, i) => task.status === true && <tr key={i} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="px-2 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                                                    <td className="text-sm text-gray-900 font-light px-2 lg:px-6 py-4 whitespace-nowrap">
                                                        {/* <input type="checkbox" name="complete" id="complete" /> */}
                                                        <button onClick={()=>handelUnChecked(task._id)} className='bg-transparent text-red-500 border hover:bg-red-400 focus:outline-none focus:ring focus:ring-blue-300 active:bg-red-700 px-2 py-1 leading-5 rounded-full font-semibold hover:text-white cursor-pointer duration-500 mt-3'>Unchecked</button>
                                                    </td>
                                                    <td className=" text-gray-900 px-2 lg:px-6 py-4 w-2 whitespace-normal">
                                                        {task.task}
                                                    </td> 
                                                    <td className="text-sm text-gray-900 font-light px-2 lg:px-6 py-4 whitespace-nowrap">
                                                        <TrashIcon onClick={()=>handleDelete(task._id)} className="h-5 w-5 text-red-300 hover:text-red-500"/>
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
            }
        </div>
    );
};

export default To_Do_List;