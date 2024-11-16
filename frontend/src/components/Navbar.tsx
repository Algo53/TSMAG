import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { selectMenu, setMenu } from "../redux/slices/userInfoSlice";

function Navbar() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectMenu);
  const userInfo = useAppSelector((state: RootState) => state.userInfo.userInfo);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const currDate = new Date;
    const format = currDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
    setCurrentDate(format);
  }, [])
  
  return (
    <div className='flex w-full h-full items-center pt-4 pb-[2px] justify-between'>
      <div className="flex gap-2 pl-3 items-center">
        <div className={`${menu ? "hidden" : "flex"}  hover:bg-black/10 py-3 px-1 rounded-md cursor-pointer`} onClick={() => dispatch(setMenu())}>
          <i className="fa-solid fa-bars fa-2xl" />
        </div>
        <div className='flex  gap-3 items-center'>
          <div className="flex px-2 py-[18px] rounded-lg hover:bg-black/10"><i className="fa-solid fa-calendar-days fa-xl cursor-pointer" /></div>
          <div className="md:flex hidden">{currentDate}</div>
        </div>
      </div>
      <div className='flex gap-3 items-center pr-2'>
        <Link to={'today'} className="sm:flex hidden items-center hover:bg-black/20 rounded-lg px-2 py-1 cursor-pointer">Today's Tasks</Link>
        <div className="sm:flex hidden text-3xl text-zinc-500">|</div>
        <div className='flex items-center hover:bg-black/20 px-2 py-3 rounded-3xl'><i className="fa-regular fa-bell fa-xl cursor-pointer" /></div>
        <div className="flex text-3xl text-zinc-500">|</div>
        <Link to='profile' className="flex items-center gap-3 rounded-lg hover:bg-black/20 py-1 px-2 cursor-pointer">
          <i className="fa-solid fa-user fa-xl" />
          <div className="xs:flex hidden font-semibold text-xl">{userInfo?.name}</div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar