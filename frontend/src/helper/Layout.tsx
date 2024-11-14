import { Outlet } from 'react-router-dom'

export default function NormalLayout() {
  return (
    <div className='flex flex-col w-full h-screen bg-zinc-100'>
        <Outlet />
    </div>
  )
}