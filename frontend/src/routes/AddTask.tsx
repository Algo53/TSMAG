import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import { addTaskRoute } from "../redux/slices/taskSlice";
import { toast } from "react-toastify";

function AddTask() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stats = useAppSelector((state: RootState) => state.taskState.status);
  const [currstatus, setCurrStatus] = useState<string>('idle'); 
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    priority: "Low",
    tags: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrStatus('loading');
    dispatch(addTaskRoute(newTask));
    navigate(-1);
  }

  useEffect(() => {
    setCurrStatus(stats);
    if (currstatus === 'loading') {
      toast.info("Adding task...", { autoClose: 2000 });
    } else if (currstatus === 'success') {
      toast.success("Task added successfully!", { autoClose: 2000 });
      navigate(-1);
    } else if (currstatus === 'failure') {
      toast.error("Failed to add task. Please try again.", { autoClose: 3000 });
    }
  }, [stats]);

  return (
    <div className="fixed inset-0 max-h-screen min-h-screen flex items-center justify-center bg-opacity-70 bg-gray-100">
      <div className="relative w-full max-w-lg mx-auto bg-white bg-opacity-90 p-8 rounded-3xl shadow-2xl text-gray-900">

        {/* Task Name as Title */}
        <div className="flex items-center mb-2 justify-between">
          <h2 className="xs:text-3xl text-2xl font-bold text-indigo-600">Create New Task</h2>
          <div
            className="py-2 px-3 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-200"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-backward fa-xl text-indigo-500"/>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Task Name */}
          <div className="col-span-2">
            <label className="block text-lg font-semibold mb-1 text-indigo-500">Task Title:</label>
            <input
              name="title"
              className="border border-gray-300 text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
              type="text"
              value={newTask.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-lg font-semibold mb-1 text-indigo-500">Description:</label>
            <textarea
              name="description"
              className="border border-gray-300 text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
              value={newTask.description}
              onChange={handleChange}
              placeholder="Enter task description"
              required
            />
          </div>

          {/* Priority */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-lg font-semibold mb-1 text-indigo-500">Priority:</label>
            <select
              name="priority"
              className="border border-gray-300 text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
              onChange={handleChange}
              value={newTask.priority}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Status */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-lg font-semibold mb-1 text-indigo-500">Status:</label>
            <select
              name="status"
              className="border border-gray-300 text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
              onChange={handleChange}
              value={newTask.status}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Tags */}
          <div className="col-span-2">
            <label className="block text-lg font-semibold mb-1 text-indigo-500">Tags:</label>
            <input
              name="tags"
              className="border border-gray-300 text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
              type="text"
              value={newTask.tags}
              onChange={handleChange}
              placeholder="Enter tags (comma-separated)"
            />
          </div>

          {/* Deadline */}
          <div className="col-span-2">
            <label className="block text-lg font-semibold mb-1 text-indigo-500">Deadline:</label>
            <input
              name="dueDate"
              className="border border-gray-300 text-gray-800 w-full rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
              type="date"
              value={newTask.dueDate}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-2">
            <button
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-300"
              type="submit"
            >
              + Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
