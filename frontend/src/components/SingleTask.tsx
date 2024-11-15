import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { deleteTaskRoute, selectAllTask, selectCurrentTask, updateTaskRoute } from "../redux/slices/taskSlice";
import { formatDate } from "../helper/FromateDate";
import { useNavigate } from "react-router-dom";

function SingleTask() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currTask = useAppSelector(selectCurrentTask);
  const tasks = useAppSelector(selectAllTask);
  const [task, setTask] = useState<Task | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(task);
  const [progress, setProgress] = useState(task?.progress || 0);
  const [isCompleted, setIsCompleted] = useState<boolean>(task?.isCompleted || false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSaveChanges = () => {
    setTask(editedTask); // Update task data in state
    dispatch(updateTaskRoute(editedTask));
    setIsEditing(false);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const handleMarkComplete = () => {
    setIsCompleted((prevCompleted) => {
      const newStatus = !prevCompleted;
      setEditedTask((prev) => prev ? { ...prev, isCompleted: newStatus } : null);
      return newStatus;
    });
  };

  const handleDelete = () => {
    dispatch(deleteTaskRoute(task?._id));
    navigate(-1);
  };

  useEffect(() => {
    if (currTask) {
      setProgress(currTask.progress || 0);
      setIsCompleted(currTask.isCompleted);
      setTask(currTask)
      setEditedTask(currTask);
    }
  }, [currTask])

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-full p-3">
      <div
        className={`bg-white rounded-lg shadow-lg transition-all duration-300 w-full p-2 ${isEditing ? "bg-gray-900 bg-opacity-50" : ""
          }`}
      >
        <div className={`${isEditing ? "max-w-none" : "max-w-4xl"} bg-white rounded-lg shadow-md px-6 py-3 transition-all duration-300`}>
          <h1 className="text-2xl font-semibold text-gray-800">{isEditing ? "Edit Task" : "Task Details"}</h1>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
              {isEditing ? (
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedTask?.title || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              ) : (
                <p className="text-gray-800">{task?.title || "Untitled Task"}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
              {isEditing ? (
                <textarea
                  id="description"
                  name="description"
                  value={editedTask?.description || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  rows={4}
                />
              ) : (
                <p className="text-gray-800">{task?.description || "No description available"}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="dueDate" className="block text-gray-700 font-semibold">Due Date</label>
              {isEditing ? (
                <input
                  type="text"
                  id="dueDate"
                  name="dueDate"
                  value={formatDate(task?.dueDate)}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              ) : (
                <p className="text-gray-800">{formatDate(task?.dueDate)}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="priority" className="block text-gray-700 font-semibold">Priority</label>
              {isEditing ? (
                <select
                  id="priority"
                  name="priority"
                  value={editedTask?.priority || "Medium"}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              ) : (
                <p className={`font-semibold ${task?.priority === "High" ? "text-red-600" : task?.priority === "Medium" ? "text-yellow-500" : "text-blue-500"}`}>
                  {task?.priority || "Medium"}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="progress" className="block text-gray-700 font-semibold">Progress</label>
              <input
                type="range"
                id="progress"
                name="progress"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-2 bg-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex justify-between">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <button
                onClick={handleMarkComplete}
                className={`py-2 px-6 mt-2 ${isCompleted ? "bg-gray-600" : "bg-green-500"} text-white rounded-lg hover:${isCompleted ? "bg-gray-700" : "bg-green-600"} transition duration-300`}
              >
                {isCompleted ? "Mark as Pending" : "Mark as Completed"}
              </button>
            </div>

            <div className="flex justify-between mt-6 gap-4">
              {isEditing ? (
                <button
                  onClick={handleSaveChanges}
                  className="py-2 px-6 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Edit Task
                </button>
              )}
              <button
                onClick={handleDelete}
                className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleTask