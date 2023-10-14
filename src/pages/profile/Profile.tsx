import { HiOutlineClipboardCopy, HiOutlineClipboardList, HiOutlineClipboardCheck } from 'react-icons/hi'
import { AiOutlineSetting, AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai'
import { TiUserDeleteOutline } from 'react-icons/ti'
import { IoHelpBuoyOutline } from 'react-icons/io5'
import { HiOutlineSwitchHorizontal, HiOutlineLogout } from 'react-icons/hi'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { getProfileFromLS, setStatusToLS } from 'src/utils/auth'
import { UserData } from 'src/types/user.type'

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const { isOrganization, setIsOrganization } = useContext(AppContext)
  const navigate = useNavigate()
  const dataProfile: UserData = getProfileFromLS()

  const handleSwitch = () => {
    setStatusToLS(!isOrganization)
    setIsOrganization((prev) => !prev)
    navigate(path.home)
  }

  return (
    <div className='relative px-4 pb-0 md:p-8 md:pb-0'>
      <div className='flex gap-4 items-center relative py-4 lg:pt-0 cursor-pointer border-b border-t lg:border-t-0'>
        <img
          className='w-20 h-20 object-cover object-center rounded-full'
          src={
            isOrganization && dataProfile.organizations[0].avatar
              ? dataProfile.organizations[0].avatar
              : dataProfile.avatar
              ? dataProfile.avatar
              : 'https://image-us.eva.vn/upload/1-2022/images/2022-02-20/1645325682-ta-xua4-16450861597682099786350.jpg'
          }
          alt='Avatar'
        />
        <div>
          <h3 className='text-xl font-medium mb-1'>
            {isOrganization ? dataProfile.organizations[0].name : dataProfile.fullName}
          </h3>
          <span>{isOrganization ? 'Profile Organization' : 'Profile Personal'}</span>
        </div>
      </div>
      <ul className='grid grid-cols-3 mt-10 place-items-center px-20'>
        <li className='text-start w-full'>
          <button className='text-center !bg-white hover:!bg-white'>
            <HiOutlineClipboardCopy className='inline text-progress w-12 h-12 md:w-16 md:h-16 !text-black' />
            <h3 className='text-lg'>Pending</h3>
            <span className='text-base text-primary font-semibold'>12 Forms</span>
          </button>
        </li>
        <li className='text-center w-full'>
          <button className='!bg-white hover:!bg-white'>
            <HiOutlineClipboardList className='inline text-progress w-12 h-12 md:w-16 md:h-16 !text-black' />
            <h3 className='text-lg'>Participating</h3>
            <span className='text-base text-primary font-semibold'>12 Campaigns</span>
          </button>
        </li>
        <li className='text-end w-full'>
          <button className='text-center !bg-white hover:!bg-white'>
            <HiOutlineClipboardCheck className='inline text-progress w-12 h-12 md:w-16 md:h-16 !text-black' />
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
          {isOrganization ? (
            <li
              className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'
              onClick={handleSwitch}
              aria-hidden
            >
              <HiOutlineSwitchHorizontal className='w-10 h-10 inline text-[#E94335]' />
              <span className='text-xl'>Switch to my account</span>
            </li>
          ) : (
            <li
              className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'
              onClick={handleSwitch}
              aria-hidden
            >
              <HiOutlineSwitchHorizontal className='w-10 h-10 inline text-[#E94335]' />
              <span className='text-xl'>Switch to my organization</span>
            </li>
          )}

          <li className='flex items-center gap-10 py-4 pl-4 hover:bg-[#D9FEFC] cursor-pointer rounded-xl'>
            <HiOutlineLogout className='w-10 h-10 inline text-[#4385F5]' />
            <span className='text-xl'>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
