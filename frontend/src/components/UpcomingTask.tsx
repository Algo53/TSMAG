import React, { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { formatDate } from '../helper/FromateDate';
import { setCurrentTask } from '../redux/slices/taskSlice';
import { useNavigate } from 'react-router-dom';

function UpcomingTask() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userTasks = useAppSelector((state: RootState) => state.taskState.allTask);
  
  const [task, setTask] = useState<Task | null>(null);
  const [duDate, setDuDate] = useState<string>('');
  const [crDate, setCrDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const handleClick = () => {
    if (task) {
      dispatch(setCurrentTask(task));
      navigate('task');
    }
  };

  useEffect(() => {
    if (userTasks && userTasks.length > 0) {
      // Find the most upcoming task by sorting the tasks based on dueDate
      const upcomingTask = userTasks
        .filter((task: Task) => task.dueDate)
        .sort((a: Task, b: Task) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0]; // Sort by dueDate

      setTask(upcomingTask || null); // Set the task or null if no task exists
      setLoading(false); // End loading when task is found
    } else {
      setLoading(false); // End loading if no tasks
    }
  }, [userTasks]);

  useEffect(() => {
    if (task) {
      setCrDate(formatDate(task.createdAt));
      setDuDate(formatDate(task.dueDate));
    }
  }, [task]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!task) {
    return <div className="text-center">No upcoming tasks</div>;
  }

  return (
    <div className="flex flex-col w-full h-full p-3 gap-3">
      <div className="flex text-2xl font-bold w-full justify-center px-5 py-1 bg-black/10 rounded-md">
        Upcoming Task
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <div className="flex text-xl font-bold">Title</div>
            <div
              className={`flex py-1 px-3 rounded-md ${task?.priority === 'Low' ? 'bg-blue-500' : task?.priority === 'Medium' ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {task?.priority}
            </div>
          </div>
          <div className="flex text-lg hover:bg-zinc-100 rounded-md py-1 cursor-pointer" onClick={handleClick}>
            {task?.title.slice(0, 150)}
          </div>
        </div>
        <div className="flex flex-col gap-2 h-24">
          <div className="flex text-xl font-bold">Description</div>
          <div className="flex text-lg overflow-y-scroll hide-scrollbar">{task?.description}</div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-1">
            <div className="flex text-lg font-bold p-1 bg-black/10 rounded-md">Due Date: {duDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingTask;
