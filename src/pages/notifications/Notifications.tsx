import { BiMessageDetail, BiDotsVerticalRounded } from 'react-icons/bi'
import Tab from 'src/components/tab'

export interface NotificationsProps {}

const item1 = {
  name: 'All notification',
  listItem: [
    {
      content:
        'You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval',
      timer: 'Now'
    },
    {
      content:
        'You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval',
      timer: '1 minute ago'
    },
    {
      content:
        'You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval',
      timer: '2 minute ago'
    },
    {
      content:
        'You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval',
      timer: '3 minute ago'
    }
  ]
}
const item2 = {
  name: 'Unread notification',
  listItem: [
    {
      content:
        'You have 1 unread message from the organization Polytechnic University - University of Danang. You have 1 unread message from the organization Polytechnic University - University of Danang. You have 1 unread message from the organization Polytechnic University - University of Danang',
      timer: 'Now'
    },
    {
      content:
        'You have 1 unread message from the organization Polytechnic University - University of Danang. You have 1 unread message from the organization Polytechnic University - University of Danang. You have 1 unread message from the organization Polytechnic University - University of Danang',
      timer: '1 minute ago'
    },
    {
      content:
        'You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval',
      timer: '2 minute ago'
    },
    {
      content:
        'You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval. You have completed your in-kind donation registration and are waiting for approval',
      timer: '3 minute ago'
    }
  ]
}

export default function Notifications(props: NotificationsProps) {
  return (
    <div>
      <header className='relative text-center p-6 border-t lg:border-t-0'>
        <h1 className='text-2xl font-medium'>Notifications</h1>
        <div className='absolute top-5 right-4'>
          <button className='bg-neutral-300 text-white rounded-full p-2 md:p-4'>
            <BiMessageDetail className='text-xl' />
          </button>
          <button className='bg-neutral-300 text-white rounded-full ml-2 md:ml-3 p-2 md:p-4'>
            <BiDotsVerticalRounded className='text-xl' />
          </button>
        </div>
      </header>
      <p className='mt-4 text-right underline pr-6 pt-4 bg-neutral-100'>Mark all as read</p>
      <div>
        <Tab item1={item1} item2={item2} />
      </div>
    </div>
  )
}
