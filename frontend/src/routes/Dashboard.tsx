import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Navbar from "../components/Navbar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const tasks = useAppSelector((state: RootState) => state.taskState.allTask);
  const userInfo = useAppSelector((state: RootState) => state.userInfo.userInfo);
  const [pendingTask, setPendingTask] = useState<number>(0);
  const [completedTask, setCompletedTask] = useState<number>(0);
  const [allTask, setAllTask] = useState<number>(0);
  const [overdueTask, setOverdueTask] = useState<number>(0);

  const data = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        data: [completedTask, pendingTask, overdueTask],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#FFB74D", "#E57373"],
      },
    ],
  };

  useEffect(() => {
    const currentDate = new Date();

    let pendingCount = 0;
    let completedCount = 0;
    let overdueCount = 0;

    if (tasks) {
      tasks.forEach((task: Task) => {
        if (task.isCompleted) {
          completedCount++;
        } else {
          const dueDate = new Date(task.dueDate);
          if (dueDate < currentDate) {
            overdueCount++;
          } else {
            pendingCount++;
          }
        }
      });
    }

    setPendingTask(pendingCount);
    setCompletedTask(completedCount);
    setOverdueTask(overdueCount);
    setAllTask(tasks ? tasks.length : 0);
  }, [tasks]);

  return (
    <>
      <div className="p-0 sm:p-2 flex w-full p-3 gap-3 bg-gray-100 min-h-screen">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-between items-center w-full p-4 bg-white rounded-3xl shadow-lg border border-gray-200 mb-4">
            {/* Main Content Section */}
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-5xl items-start">
              {/* Pie Chart Section */}
              <div className="w-full sm:w-1/2 bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
                  Statistics
                </h3>
                <Pie data={data} />
              </div>

              {/* Task Summary Cards */}
              <div className="flex flex-col gap-6 w-full sm:w-1/2">
                <div className="text-center mb-4">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                    Hello {userInfo?.name}, you have{" "}
                    <span className="font-bold text-blue-600">{pendingTask}</span>{" "}
                    tasks pending.
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Pending Tasks Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-md text-center border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Pending Tasks</h3>
                    <p className="text-3xl font-semibold text-orange-600">{pendingTask}</p>
                  </div>

                  {/* Completed Tasks Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-md text-center border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Completed Tasks</h3>
                    <p className="text-3xl font-semibold text-green-600">{completedTask}</p>
                  </div>

                  {/* Overdue Tasks Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-md text-center border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Overdue Tasks</h3>
                    <p className="text-3xl font-semibold text-red-600">{overdueTask}</p>
                  </div>

                  {/* Total Tasks Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-md text-center border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Total Tasks</h3>
                    <p className="text-3xl font-semibold text-blue-600">{allTask}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
