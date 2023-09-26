import * as React from 'react'
import { useRoutes } from 'react-router-dom'
import path from 'src/constants/path'
import Home from 'src/pages/home'
import Login from 'src/pages/login'
import NotFound from 'src/pages/notfound'
import Register from 'src/pages/register'

export default function useRoutElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: <Home />
    },
    {
      path: path.login,
      element: <Login />
    },
    {
      path: path.register,
      element: <Register />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}
