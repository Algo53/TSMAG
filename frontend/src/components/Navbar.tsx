import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

function Navbar() {
  const userInfo = useAppSelector( (state: RootState) => state.userInfo.userInfo);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect( () => {
    const currDate = new Date;
    const format = currDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
    setCurrentDate(format);
  }, [])
  return (
    <div className='flex w-full h-full items-center pt-4 justify-between'>
      <div className='flex pl-3 gap-3 items-center'>
        <div className="flex px-2 py-[18px] rounded-lg hover:bg-black/10"><i className="fa-solid fa-calendar-days fa-xl cursor-pointer"/></div>
        <div className="">{currentDate}</div>
      </div>
      <div className='flex gap-3 items-center'>
        <Link to={'today'} className="flex items-center hover:bg-zinc-200 rounded-lg px-2 py-1 cursor-pointer">Today's Tasks</Link>
        <div className="flex text-3xl text-zinc-500">|</div>
        <div className='flex items-center hover:bg-zinc-200 px-1 py-3 rounded-3xl'><i className="fa-regular fa-bell fa-xl cursor-pointer"/></div>
        <div className="flex text-3xl text-zinc-500">|</div>
        <Link to='profile' className="flex items-center gap-3 rounded-lg hover:bg-zinc-200 py-1 px-2 cursor-pointer">
          <i className="fa-solid fa-user fa-xl"/>
          <div className="flex font-semibold text-xl">{userInfo?.name}</div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar