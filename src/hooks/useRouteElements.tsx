import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/context/app.context'
import MainLayout from 'src/layouts/mainLayout'
import Explore from 'src/pages/explore'
import CampaignDetails from 'src/pages/explore/pages/campaignDetails'
import Donate from 'src/pages/explore/pages/donate'
import VolunteerRegister from 'src/pages/explore/pages/volunteerRegister'

import Home from 'src/pages/home'
import Login from 'src/pages/login'
import Management from 'src/pages/management'
import ManagementDetails from 'src/pages/management/page/details'
import NotFound from 'src/pages/notfound'
import Notifications from 'src/pages/notifications'
import Profile from 'src/pages/profile'
import Register from 'src/pages/register'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRoutElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: <ProtectedRoute />,
      children: [
        {
          path: path.home,
          element: <MainLayout />,
          children: [
            {
              path: path.home,
              element: <Home />
            },
            {
              path: path.explore,
              element: <Explore />
            },
            {
              path: path.campaignDetails,
              element: <CampaignDetails />
            },
            {
              path: path.volunteerRegister,
              element: <VolunteerRegister />
            },
            {
              path: path.donate,
              element: <Donate />
            },
            {
              path: path.management,
              element: <Management />
            },
            {
              path: path.managementDetails,
              element: <ManagementDetails />
            },
            {
              path: path.createCampaign,
              element: <ManagementDetails />
            },
            {
              path: path.notifications,
              element: <Notifications />
            },
            {
              path: path.profile,
              element: <Profile />
            }
          ]
        }
      ]
    },
    {
      path: path.home,
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Login />
        },
        {
          path: path.register,
          element: <Register />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}
