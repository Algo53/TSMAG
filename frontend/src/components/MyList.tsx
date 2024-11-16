import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hook';
import { formatDate } from '../helper/FromateDate';
import { setCurrentTask } from '../redux/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSimilarityScore } from '../helper/StringMatching';

interface MyListProps {
    type: string | null;
}

function MyList({ type }: MyListProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userTasks = useAppSelector((state: RootState) => state.taskState.allTask);
    const userInfo = useAppSelector((state: RootState) => state.userInfo.userInfo);
    const [search, setSearch] = useState<string>('');
    const [prSearch, setPrsearch] = useState<boolean>(false);
    const [progressSearch, setProgressSearch] = useState<boolean>(false);
    const [sTask, setSTask] = useState([]);

    const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };


    const handlePrioritySearch = () => {
        const sortedList = [...sTask].sort((a: Task, b: Task) => {
            const priorityA = priorityOrder[a.priority] || 0;
            const priorityB = priorityOrder[b.priority] || 0;
            return prSearch ? priorityB - priorityA : priorityA - priorityB;
        });
        console.log(sortedList);
        if (sortedList) setSTask(sortedList);
        if (prSearch) setPrsearch(false);
        else setPrsearch(true);
    }

    const handleProgressSearch = () => {
        const sortedList = [...sTask].sort((a: Task, b: Task) => {
            return progressSearch ? b.progress - a.progress : a.progress - b.progress;
        });
        if (sortedList) setSTask(sortedList);
        setProgressSearch(!progressSearch);
    }

    const handleClick = (item: Task | null) => {
        dispatch(setCurrentTask(item));
        navigate(`/${userInfo?._id}/task`);
    }

    const handleSearch = () => {
        const filteredTasks = userTasks?.filter((task: Task) => {
            if (type === 'Pending') {
                return !task.isCompleted;
            } else if (type === 'Completed') {
                return task.isCompleted;
            } else if (type === 'My') {
                return true;
            }
            else if (type === 'Today') {
                const date = new Date(task.dueDate);
                const dt = date.toISOString().slice(0, 10);
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 10);
                if (dt === formattedDate) return true;
                else return false;
            }
            return true;
        });
        if (filteredTasks) setSTask(filteredTasks);
        const searchedTasks = filteredTasks
            ?.filter((task: Task) => task.title.toLowerCase().includes(search.toLowerCase()))
            .sort((a: Task, b: Task) => getSimilarityScore(search, b.title) - getSimilarityScore(search, a.title));
        if (searchedTasks) {
            setSTask(searchedTasks);
        }
    };

    useEffect(() => {
        // Filter tasks based on the `type` prop
        const filteredTasks = userTasks?.filter((task: Task) => {
            if (type === 'Pending') {
                return !task.isCompleted;
            } else if (type === 'Completed') {
                return task.isCompleted;
            } else if (type === 'My') {
                return true;
            }
            else if (type === 'Today') {
                const date = new Date(task.dueDate);
                const dt = date.toISOString().slice(0, 10);
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 10);
                if (dt === formattedDate) return true;
                else return false;
            }
            return true;
        });
        if (filteredTasks) setSTask(filteredTasks);
    }, [])

    return (
        <>
            {type === "My" ?
                <div className="flex flex-col w-full h-full p-3 gap-2 min-h-screen">
                    <div className='flex justify-between'>
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">My Tasks</h1>
                        <div className='flex gap-3'>
                            <div className='flex items-center gap-1'>
                                <div>Progress :</div>
                                <div className='py-1 px-1 hover:bg-black/10 rounded-lg cursor-pointer' onClick={handleProgressSearch}><i className={`fa-solid ${progressSearch ? "fa-arrow-down-wide-short" : "fa-arrow-up-wide-short"} fa-xl`} /></div>
                            </div>
                            <div className='flex items-center gap-1'>
                                <div>Priority :</div>
                                <div className='py-1 px-1 hover:bg-black/10 rounded-lg cursor-pointer' onClick={handlePrioritySearch}><i className={`fa-solid ${prSearch ? "fa-arrow-down-wide-short" : "fa-arrow-up-wide-short"} fa-xl`} /></div>
                            </div>
                            <div className='flex border-2 border-slate-200 rounded-xl py-1 px-3 gap-2 items-center'>
                                <input className='text-sm bg-zinc-100 lg:w-52' type='text' name='search' value={search} placeholder='Enter the title of the task to search...' onChange={(e) => setSearch(e.target.value)} />
                                <div className='py-1 px-2 hover:bg-black/20 rounded-lg cursor-pointer' onClick={handleSearch}><i className='fa-solid fa-search fa-lg' /></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full overflow-auto bg-white p-4 rounded-lg shadow-md border border-gray-200 hide-scrollbar">
                        <div className='flex flex-col gap-3 w-full'>
                            {sTask && sTask.map((task: Task, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col w-full p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg gap-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer'
                                    onClick={() => handleClick(task)}
                                >
                                    <div className='flex justify-between'>
                                        <div className='flex text-xl font-bold text-white'>{task.title}</div>
                                        <div className={`flex py-1 px-3 rounded-md text-white ${task?.priority === 'Low' ? 'bg-blue-500' : task?.priority === 'Medium' ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {task?.priority}
                                        </div>
                                    </div>
                                    <div className='flex text-lg text-white h-max-32 overflow-y-scroll hide-scrollbar'>{task.description}</div>
                                    <div className='flex w-full gap-5'>
                                        <div className='flex items-center text-white'>
                                            <div className='font-semibold pr-2'>Due Date:</div>{formatDate(task.dueDate)}
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <div className='font-semibold text-white'>Progress:</div>
                                            <div className="flex w-48 h-3 shadow-inner bg-gray-200 rounded-full mt-2">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${task.progress}%`,
                                                        backgroundColor: 'black',
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                :
                <div className='flex flex-col gap-3 w-full'>
                    {sTask && sTask.map((task: Task, index) => (
                        <div
                            key={index}
                            className='flex flex-col w-full p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg gap-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer'
                            onClick={() => handleClick(task)}
                        >
                            <div className='flex justify-between'>
                                <div className='flex text-xl font-bold text-white'>{task.title}</div>
                                <div className={`flex py-1 px-3 rounded-md text-white ${task?.priority === 'Low' ? 'bg-blue-500' : task?.priority === 'Medium' ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {task?.priority}
                                </div>
                            </div>
                            <div className='flex text-lg text-white h-max-32 overflow-y-scroll hide-scrollbar'>{task.description}</div>
                            <div className='flex w-full gap-5'>
                                <div className='flex items-center text-white'>
                                    <div className='font-semibold pr-2'>Due Date:</div>{formatDate(task.dueDate)}
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <div className='font-semibold text-white'>Progress:</div>
                                    <div className="flex w-48 h-3 shadow-inner bg-gray-200 rounded-full mt-2">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${task.progress}%`,
                                                backgroundColor: 'black',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default MyList