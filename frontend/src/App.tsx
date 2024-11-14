import './App.css';
import Home from './routes/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NormalLayout from './helper/Layout';
import Login from './routes/Login';
import Register from './routes/Register';
import UserLayout from './helper/UserLayout';
import UserHome from './routes/UserHome';
import AddTask from './routes/AddTask';
import MyTask from './routes/MyTask';
import CompletedTask from './routes/CompletedTask';
import PendingTask from './routes/PendingTask';
import ProfilePage from './routes/ProfilePage';
import Dashboard from './routes/Dashboard';
import TodaysTasks from './routes/TodaysTasks';
import SingleTask from './components/SingleTask';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <NormalLayout />,
        children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/signup",
            element: <Register />
          }
        ]
      },
      {
        path: '/:id',
        element: <UserLayout />,
        children: [
          {
            path: '',
            element: <UserHome />
          },
          {
            path: 'task',
            element: <SingleTask />
          },
          {
            path: 'add',
            element: <AddTask />
          },
          {
            path: 'today',
            element: <TodaysTasks />
          },
          {
            path: 'mytask',
            element: <MyTask />
          },
          {
            path: 'completed',
            element: <CompletedTask />
          },
          {
            path: 'pending',
            element: <PendingTask />
          },
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'profile',
            element: <ProfilePage />
          },
        ]
      }
    ]
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App;
