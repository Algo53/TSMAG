import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import { selectUser } from '../redux/slices/userInfoSlice';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';

export default function UserLayout() {
  const userOnline = useAppSelector(selectUser);
  const [logout, setLogout] = useState<boolean>(false);
  useEffect( () => {
    if (userOnline === false){
      setLogout(false);
    }
    else {
      setLogout(true);
    }
  }, [userOnline])

  if (logout){
    <Navigate to={'/login'} />
  }
  
  return (
    <div className='flex w-full h-screen bg-zinc-100'>
      <div className='flex h-full w-3/12 p-3'>
        <Sidebar />
      </div>
      <div className='flex h-full w-9/12'>
        <Outlet />
      </div>
    </div>
  )
}
