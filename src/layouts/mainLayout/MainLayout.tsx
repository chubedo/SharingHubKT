/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { dataSideBar } from 'src/data/sidebar.dummy'
import { IoLogOutOutline } from 'react-icons/io5'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { MdVolunteerActivism } from 'react-icons/md'
import path from 'src/constants/path'
import { clearLS } from 'src/utils/auth'
import { AppContext } from 'src/context/app.context'

export interface MainLayoutProps {}

export default function MainLayout(props: MainLayoutProps) {
  const [isToggle, setIsToggle] = useState<boolean>(false)
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setIsToggle(false)
  }, [pathname])

  const openSidebar = () => {
    setIsToggle(true)
  }
  const hideSidebar = () => {
    setIsToggle(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
    navigate(path.login)
  }

  return (
    <div>
      <div>
        <div>
          <button
            onClick={openSidebar}
            data-drawer-target='default-sidebar'
            data-drawer-toggle='default-sidebar'
            aria-controls='default-sidebar'
            type='button'
            className='inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg lg:hidden !bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 relative z-20'
          >
            <span className='sr-only'>Open sidebar</span>
            <HiOutlineMenuAlt2 className='w-6 h-6' />
          </button>
          <aside
            id='default-sidebar'
            aria-label='Sidebar'
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0 ${
              isToggle ? 'translate-x-0' : ''
            }`}
          >
            <div className='h-full px-3 py-4 overflow-y-auto bg-gray-200'>
              <ul className='space-y-2 font-medium h-full relative'>
                <li className='mb-12'>
                  <Link to='/' className='flex items-center p-2 text-gray-900 rounded-lg'>
                    <MdVolunteerActivism className='icon' />
                    <span className='ml-3'>Logo is here!</span>
                  </Link>
                </li>
                {dataSideBar.map((data, index) => (
                  <li
                    key={index}
                    className={`rounded-lg ${data.to === pathname ? 'bg-primary text-white' : 'text-gray-900'} `}
                  >
                    <Link
                      to={`${data.to}`}
                      className='flex items-center p-2 rounded-lg hover:bg-primary hover:text-white'
                    >
                      {data.icon}
                      <span className='flex-1 ml-3 whitespace-nowrap'>{data.title}</span>
                    </Link>
                  </li>
                ))}
                <li
                  className='absolute left-0 bottom-0 w-full cursor-pointer hover:bg-primary hover:text-white rounded-lg'
                  onClick={handleLogout}
                >
                  <span className='flex items-center p-2 text-gray-900 rounded-lg hover:text-white'>
                    <IoLogOutOutline className='icon' />
                    <span className='ml-3'>Log out</span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        {isToggle && (
          <div
            className='fixed top-0 left-0 bottom-0 right-0 bg-overlay z-10'
            onClick={hideSidebar}
            aria-hidden='true'
          ></div>
        )}
      </div>
      <div className='lg:ml-64'>{<Outlet />}</div>
    </div>
  )
}
