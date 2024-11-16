import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { RootState } from '../redux/store';
import { setMenu, setMode } from '../redux/slices/userInfoSlice';

function Sidebar() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state: RootState) => state.userInfo.mode);
    const userInfo = useAppSelector((state: RootState) => state.userInfo.userInfo);
    const urls = [
        { path: '', name: 'Home' },
        { path: 'mytask', name: 'My Tasks' },
        { path: 'completed', name: 'Completed Tasks' },
        { path: 'pending', name: 'Pending Tasks' },
        { path: 'dashboard', name: 'Dashboard' },
        { path: 'profile', name: 'Profile' },
    ]

    const [currentPath, setCurrentPath] = useState<string>('/');

    const handleMode = () => { dispatch(setMode()); }

    useEffect(() => {
        const lastSegment = location.pathname.split('/').filter(Boolean).pop();
        if (lastSegment === userInfo?._id) {
            setCurrentPath('')
        }
        else if (lastSegment === 'completed') {
            setCurrentPath('completed');
        }
        else if (lastSegment === 'mytask') {
            setCurrentPath('mytask');
        }
        else if (lastSegment === 'pending') {
            setCurrentPath('pending');
        }
        else if (lastSegment === 'add') {
            setCurrentPath('add');
        }
        else if (lastSegment === 'profile') {
            setCurrentPath('profile');
        }
        else {
            setCurrentPath(lastSegment || '/')
        }
    }, [location])

    return (
        <div className='flex flex-col w-full h-full min-h-screen shadow-lg hover:shadow-xl bg-gradient-to-r from-teal-400 to-blue-500 xl:rounded-xl gap-4 p-4'>
            <div className='flex pt-3 px-2 text-4xl font-bold w-full justify-between items-center'>
                <div className='flex text-white'>TAMG</div>
                <div className='flex gap-3'>
                    <div className='flex hover:bg-black/20 rounded-full py-1 px-2'>
                        {
                            mode === 'light' ?
                                <i className="fa-regular fa-moon fa-md cursor-pointer text-white" onClick={handleMode} />
                                :
                                <i className="fa-solid fa-moon fa-md cursor-pointer text-white" onClick={handleMode} />
                        }
                    </div>
                    <div className={`flex p-1 rounded-lg hover:bg-black/10 cursor-pointer`} onClick={() => dispatch(setMenu())}><i className="fa-solid fa-square-caret-left fa-md" /></div>
                </div>
            </div>
            <Link to='add' className={`flex py-2 w-full pl-2 border-2 border-slate-100 rounded-lg hover:bg-zinc-200 font-semibold cursor-pointer items-center ${currentPath === 'add' ? "bg-zinc-100 text-2xl shadow-inner text-black" : "text-xl text-white hover:text-2xl"}`} onClick={() => dispatch(setMenu())}>
                <i className="fa-solid fa-plus fa-xl pr-2" />Create
            </Link>
            <div className='flex flex-col w-full gap-2'>
                <div className='flex w-full text-zinc-400 text-lg font-semibold'>General</div>
                <div className='flex flex-col w-full gap-3 text-xl'>
                    {
                        urls.slice(0, 5).map((url, index) => (
                            <Link key={index} to={url.path} className={`flex w-full pl-2 py-2 rounded-lg hover:bg-zinc-200 cursor-pointer items-center ${currentPath === url.path ? "bg-zinc-100 font-bold shadow-inner text-black" : "font-semibold text-white"}`} onClick={() => dispatch(setMenu())}>
                                {url.name}
                            </Link>
                        ))
                    }
                    <Link to={'today'} className={`sm:hidden flex w-full pl-2 py-2 rounded-lg hover:bg-zinc-200 cursor-pointer items-center ${currentPath === 'today' ? "bg-zinc-100 font-bold shadow-inner text-black" : "font-semibold text-white"}`} onClick={() => dispatch(setMenu())}>
                        Today Tasks
                    </Link>
                </div>
            </div>
            <div className='flex items-end h-full w-full pb-4'>
                {
                    urls.slice(5).map((url, index) => (
                        <Link key={index} to={url.path} className={`flex w-full pl-2 py-3 text-3xl rounded-lg hover:bg-zinc-200 cursor-pointer items-center ${currentPath === url.path ? "bg-zinc-100 font-bold shadow-inner text-black" : "font-semibold text-white"}`} onClick={() => dispatch(setMenu())}>
                            <i className="fa-solid fa-user fa-lg pr-5 pl-2" />{url.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar