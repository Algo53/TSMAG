import Navbar from '../components/Navbar';
import Statitics from '../components/Statitics';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { RootState } from '../redux/store';
import UpcomingTask from '../components/UpcomingTask';
import List from '../components/List';
import { useEffect, useState } from 'react';
import { getAllTaskRoute } from '../redux/slices/taskSlice';

function UserHome() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state: RootState) => state.userInfo.userInfo);
  const userTasks = useAppSelector((state: RootState) => state.taskState.allTask);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);
  const [pendingTask, setPendingTask] = useState<Task[]>([]);

  useEffect(() => {
    if (userTasks && userTasks.length > 0) {
      const completed = userTasks.filter((task: Task) => task.isCompleted);
      const pending = userTasks.filter((task: Task) => !task.isCompleted);

      setCompletedTask(completed);
      setPendingTask(pending);
    }
  }, [userTasks]);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    dispatch(getAllTaskRoute());
  }, []);

  return (
    <div className="flex flex-col w-full h-screen gap-1 pr-5 pb-3 bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100">
      {/* Navbar */}
      <div className="flex w-full h-[70px] bg-blue-200 shadow-md rounded-md">
        <Navbar />
      </div>

      {/* Greeting */}
      <div className="flex w-full text-4xl py-3 px-5 text-gray-700">
        <div className="text-blue-600 font-semibold">
          {getGreeting()},
        </div>
        <span className="ml-1 text-gray-800">
          {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1) : 'User'}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow w-full gap-3">
        {/* First Row: UpcomingTask and Statistics */}
        <div className="flex w-full gap-3">
          <div className="flex w-1/2 bg-white rounded-lg shadow-lg p-4">
            <UpcomingTask />
          </div>
          <div className="flex w-1/2 bg-white rounded-lg shadow-lg p-4">
            <Statitics />
          </div>
        </div>

        {/* Second Row: Recent Completed, Pending Tasks, and All Tasks */}
        <div className="flex w-full gap-3 h-44">
          <div className="flex w-1/3 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col w-full">
              <h2 className="py-2 text-lg font-semibold text-blue-600">Recent Completed</h2>
              <div className="flex w-full h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-300 hide-scrollbar">
                <List task="Completed" />
              </div>
            </div>
          </div>
          <div className="flex w-1/3 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col w-full">
              <h2 className="py-2 text-lg font-semibold text-blue-600">Pending Tasks</h2>
              <div className="flex w-full h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-300 hide-scrollbar">
                <List task="Pending" />
              </div>
            </div>
          </div>
          <div className="flex w-1/3 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col w-full">
              <h2 className="py-2 text-lg font-semibold text-blue-600">All Tasks</h2>
              <div className="flex w-full h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-300 hide-scrollbar">
                <List task="All" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
