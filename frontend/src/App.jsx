
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Jobs from './pages/user/Jobs'
import Login from './pages/user/Login'
import Home from './pages/user/Home'


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
