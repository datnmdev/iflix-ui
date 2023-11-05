import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './App.css'
import Root from './layouts/Root'
import Error from './pages/Error'
import Home from './pages/Home'
import Watch from './pages/Watch'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/player/:movieId',
        element: <Watch />
      },
      {
        path: '/admin',
        element: <Root />,
        children: [
          {
            index: true,
            element: <Home />
          }
        ]
      }
    ]
  }
])

export default function App() {
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      return
    }

    document.documentElement.classList.remove('dark')        
  }, [])

  return (
    <RouterProvider router={router} />
  )
}