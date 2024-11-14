import React from 'react'
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hook';
import { formatDate } from '../helper/FromateDate';
import { setCurrentTask } from '../redux/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface MyListProps {
    type: string | null;
}

function MyList({ type }: MyListProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userTasks = useAppSelector((state: RootState) => state.taskState.allTask);
    const userInfo = useAppSelector((state: RootState) => state.userInfo.userInfo);
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

    const handleClick = (item: Task | null) => {
        dispatch(setCurrentTask(item));
        navigate(`/${userInfo?._id}/task`);
    }

    return (
        <div className='flex flex-col gap-3 w-full'>
            {filteredTasks && filteredTasks.map((task: Task, index) => (
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
    )
}

export default MyList