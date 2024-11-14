import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";

function Statitics() {
    const tasks = useAppSelector((state: RootState) => state.taskState.allTask);
    const [stats, setStats] = useState([
        { name: 'Total Tasks', value: 0 },
        { name: 'Active Tasks', value: 0 },
        { name: 'Completed Tasks', value: 0 },
        { name: 'Pending Tasks', value: 0 }
    ])

    const [priority, setPriority] = useState([
        { name: 'High', value: 0 },
        { name: 'Medium', value: 0 },
        { name: 'Low', value: 0 }
    ]);

    useEffect(() => {
        const currentDate = new Date();

        // Initialize counts
        let pendingCount = 0;
        let completedCount = 0;
        let overdueCount = 0;
        let activeTask = 0;
        let highPriorityCount = 0;
        let moderatePriorityCount = 0;
        let normalPriorityCount = 0;

        if (tasks == null) return;

        tasks.forEach((task: Task) => {
            // Counting tasks based on completion status and progress
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
            if (task.progress > 0 && task.progress < 100) {
                activeTask++;
            }

            // Counting tasks based on priority
            if (task.priority === 'High') {
                highPriorityCount++;
            } else if (task.priority === 'Medium') {
                moderatePriorityCount++;
            } else if (task.priority === 'Low') {
                normalPriorityCount++;
            }
        });


        setStats([
            { name: 'Total Tasks', value: tasks.length },
            { name: 'Active Tasks', value: activeTask },
            { name: 'Completed Tasks', value: completedCount },
            { name: 'Pending Tasks', value: pendingCount }
        ]);

        setPriority([
            { name: 'High', value: highPriorityCount },
            { name: 'Moderate', value: moderatePriorityCount },
            { name: 'Normal', value: normalPriorityCount }
        ]);
    }, [tasks]);

    return (
        <div className='flex w-full h-full py-3 px-5 bg-black/70 text-white rounded-xl gap-2'>
            <div className='flex flex-col w-1/2 h-full justify-around'>
                {
                    stats.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className='flex text-xl font-bold'>{item.name}</div>
                            <div className='flex text-xl font-semibold pl-3'>{item.value}</div>
                        </div>
                    ))
                }
            </div>
            <div className='flex flex-col w-1/2 h-full'>
                <div className='flex w-full text-2xl font-bold w-full justify-center pb-3'>Based on Priority</div>
                <div className='flex flex-col gap-2'>
                    {
                        priority.map((item, index) => (
                            <div key={index} className='flex flex-col gap-1'>
                                <div className='flex text-xl font-bold'>{item.name}</div>
                                <div className='flex text-xl font-semibold pl-3'>{item.value}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Statitics;