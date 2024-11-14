import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { RootState } from '../redux/store'
import { getAllTaskRoute } from '../redux/slices/taskSlice';
import MyList from '../components/MyList';

function MyTask() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllTaskRoute());
  }, [])

  return (
    <div className="flex flex-col w-full h-full p-5 gap-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">My Tasks</h1>
      <div className="flex w-full overflow-auto bg-white p-4 rounded-lg shadow-md border border-gray-200 hide-scrollbar">
        <MyList type="My" />
      </div>
    </div>
  )
}

export default MyTask