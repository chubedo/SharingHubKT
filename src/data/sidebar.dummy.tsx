import { MdOutlineNotifications } from 'react-icons/md'
import { GrLocation } from 'react-icons/gr'
import { HiOutlineGlobe, HiUser, HiOutlineLocationMarker } from 'react-icons/hi'

export const dataSideBar = [
  {
    icon: <HiOutlineLocationMarker className='w-5 h-5' />,
    title: 'Map',
    to: '/'
  },
  {
    icon: <HiOutlineGlobe className='w-5 h-5' />,
    title: 'Explore',
    to: '/explore'
  },
  {
    icon: <MdOutlineNotifications className='w-5 h-5' />,
    title: 'Notifications',
    to: '/notifications'
  },
  {
    icon: <HiUser className='w-5 h-5' />,
    title: 'Profile',
    to: '/profile'
  }
]
