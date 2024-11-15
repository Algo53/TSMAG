import React, { useEffect, useState } from 'react'
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
    <div className='flex w-full h-full'>
      <MyList type='My' />
    </div>
  )
}

export default MyTask