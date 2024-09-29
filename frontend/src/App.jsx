
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Jobs from './pages/user/Jobs'
import Login from './pages/user/Login'
import Home from './pages/user/Home'
import Register from './pages/user/Register'
import Profile from './pages/user/Profile'
import UpdateProfile from './pages/user/UpdateProfile'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/update-profile",
      element: <UpdateProfile />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
