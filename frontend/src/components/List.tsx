import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { setCurrentTask } from "../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";

function List(type: any) {
  console.log(type);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userTasks = useAppSelector((state: RootState) => state.taskState.allTask);
  // Filter tasks based on the `type` prop
  const filteredTasks = userTasks?.filter((task: Task) => {
    if (type.task === 'Pending') {
      return !task.isCompleted;
    } else if (type.task === 'Completed') {
      return task.isCompleted;
    } else if (type.task === 'All') {
      return true;
    }
    return true;
  });

  const handleClick = (task: any) => {
    dispatch(setCurrentTask(task));
    navigate('task');
  }

  return (
    <div className='flex flex-col gap-3 w-full'>
      {
        filteredTasks && filteredTasks.map((task: Task, index) => (
          <div key={index} className='flex flex-col w-full p-3 bg-white rounded-lg gap-3 shadow-inner hover:shadow-2xl border-2 border-slate-100'>
            <div className='flex justify-between cursor-pointer hover:bg-zinc-100 rounded-l-md items-center' onClick={() => handleClick(task)}>
              <div className='flex font-bold'>{task.title.slice(0, 20)}....</div>
              <div className={`flex py-1 px-3 rounded-md ${task?.priority === 'Low' ? 'bg-blue-500' : task?.priority === 'Medium' ? 'bg-green-500' : 'bg-red-500'}`}>{task?.priority}</div>
            </div>
          </div>
        ))
      }
    </div>

  )
}

export default List
