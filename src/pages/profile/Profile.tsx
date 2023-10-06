import { HiOutlineClipboardCopy, HiOutlineClipboardList, HiOutlineClipboardCheck } from 'react-icons/hi'
import { AiOutlineSetting, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai'
import { TiUserDeleteOutline } from 'react-icons/ti'
import { IoHelpBuoyOutline } from 'react-icons/io5'
import { HiOutlineSwitchHorizontal, HiOutlineLogout } from 'react-icons/hi'

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  return (
    <div className='relative px-4 pb-0 md:p-8 md:pb-0'>
      <div className='flex gap-4 items-center relative py-4 lg:pt-0 cursor-pointer border-b border-t lg:border-t-0'>
        <img
          className='w-20 h-20 object-cover object-center rounded-full'
          src='https://image-us.eva.vn/upload/1-2022/images/2022-02-20/1645325682-ta-xua4-16450861597682099786350.jpg'
          alt='Avatar'
        />
        <div>
          <h3 className='text-xl font-medium mb-1'>Pham Tuyen</h3>
          <span>Profile Personal</span>
        </div>
      </div>
      <ul className='grid grid-cols-3 mt-10 place-items-center px-20'>
        <li className='text-start w-full'>
          <button className='text-center !bg-white'>
            <HiOutlineClipboardCopy className='inline text-progress w-12 h-12 md:w-16 md:h-16' />
            <h3 className='text-lg'>Pending</h3>
            <span className='text-base text-primary font-semibold'>12 Forms</span>
          </button>
        </li>
        <li className='text-center w-full'>
          <button className='!bg-white'>
            <HiOutlineClipboardList className='inline text-progress w-12 h-12 md:w-16 md:h-16' />
            <h3 className='text-lg'>Participating</h3>
            <span className='text-base text-primary font-semibold'>12 Campaigns</span>
          </button>
        </li>
        <li className='text-end w-full'>
          <button className='text-center !bg-white'>
            <HiOutlineClipboardCheck className='inline text-progress w-12 h-12 md:w-16 md:h-16' />
            <h3 className='text-lg'>Done</h3>
            <span className='text-base text-primary font-semibold'>20 Campaigns</span>
          </button>
        </li>
      </ul>
      <div className='mt-8 optionsUser'>
        <h2 className='text-2xl font-semibold'>Options</h2>
        <ul className='mt-6'>
          <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <AiOutlineSetting className='w-10 h-10 inline text-[#109D59]' />
            <span className='text-xl'>Setting</span>
          </li>
          <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <AiOutlineStar className='w-10 h-10 inline text-[#E94335]' />
            <span className='text-xl'>About us</span>
          </li>
          <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <AiOutlineShareAlt className='w-10 h-10 inline text-[#4385F5]' />
            <span className='text-xl'>Share this app</span>
          </li>
          <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <IoHelpBuoyOutline className='w-10 h-10 inline text-[#F5B401]' />
            <span className='text-xl'>Help center</span>
          </li>
          <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <TiUserDeleteOutline className='w-10 h-10 inline text-[#109D59]' />
            <span className='text-xl'>Delete account</span>
          </li>
          {/* <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <HiOutlineSwitchHorizontal className='w-10 h-10 inline text-[#E94335]' />
            <span className='text-xl'>My organizations</span>
          </li> */}
          <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <HiOutlineSwitchHorizontal className='w-10 h-10 inline text-[#E94335]' />
            <span className='text-xl'>Switch my account</span>
          </li>
          <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <HiOutlineLogout className='w-10 h-10 inline text-[#4385F5]' />
            <span className='text-xl'>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
