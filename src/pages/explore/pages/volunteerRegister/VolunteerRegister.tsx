import { Button, Modal, Tabs, TabsProps } from 'antd'
import * as React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import path from 'src/constants/path'
import meo from 'src/assets/img/meo.png'
import chuot from 'src/assets/img/chuot.png'
import gau from 'src/assets/img/gau.png'
import { toast } from 'react-toastify'

export interface VolunteerRegisterProps {}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Gần đây nhất',
    children: (
      <div className='flex flex-col mt-4 border-b border-[#C2C3C7]'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='flex items-center justify-between border-t border-[#C2C3C7] py-3'>
              <div className='flex items-center gap-4'>
                <img src={meo} alt='img' className='w-14 h-14 object-cover rounded-full' />
                <span className='text-primary'>Chim triền triện</span>
              </div>
              <p className='font-semibold text-base'>xxxxxxx469</p>
            </div>
          ))}
      </div>
    )
  },
  {
    key: '2',
    label: 'Tháng',
    children: (
      <div className='flex flex-col mt-4 border-b border-[#C2C3C7]'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='flex items-center justify-between border-t border-[#C2C3C7] py-3'>
              <div className='flex items-center gap-4'>
                <img src={chuot} alt='img' className='w-14 h-14 object-cover rounded-full' />
                <span className='text-primary'>Chim triền triện</span>
              </div>
              <p className='font-semibold text-base'>xxxxxxx469</p>
            </div>
          ))}
      </div>
    )
  },
  {
    key: '3',
    label: 'Năm',
    children: (
      <div className='flex flex-col mt-4 border-b border-[#C2C3C7]'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='flex items-center justify-between border-t border-[#C2C3C7] py-3'>
              <div className='flex items-center gap-4'>
                <img src={gau} alt='img' className='w-14 h-14 object-cover rounded-full' />
                <span className='text-primary'>Chim triền triện</span>
              </div>
              <p className='font-semibold text-base'>xxxxxxx469</p>
            </div>
          ))}
      </div>
    )
  }
]

export default function VolunteerRegister(props: VolunteerRegisterProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleConfirmClose = () => {
    return Modal.confirm({
      title: 'Bạn chưa xác nhận đã hoàn thành form đăng kí.',
      content: ' Bạn có chắc chắn muốn thoát không?',
      okText: 'Thoát',
      cancelText: 'Hủy',
      onOk: () => {
        navigate(`${path.explore}/${id}`)
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )
    })
  }

  return (
    <div className='pt-[4.5rem] pb-8'>
      <header className='fixed top-0 left-0 lg:left-64 w-full py-9 bg-[#D9FEFC] text-black text-xl font-bold uppercase z-10'>
        <div
          className='absolute top-1/2 -translate-y-1/2 right-5 lg:left-5 lg:right-[unset] cursor-pointer'
          onClick={handleConfirmClose}
          aria-hidden='true'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 text-primary'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
          </svg>
        </div>
        <span className='absolute top-1/2 left-1/2 lg:left-[calc((100%-_16rem)_/_2)] -translate-x-1/2 -translate-y-1/2'>
          Tình Nguyện Viên
        </span>
      </header>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-32 relative px-12 place-content-center min-h-[calc(100vh_-_4.5rem)]'>
        <div className='w-full flex flex-col gap-8 lg:gap-20 mt-6 lg:mt-0'>
          <h2 className='text-center text-2xl font-semibold'>Danh sách tình nguyện viên</h2>
          <div className='border-1 border-[#ADADAD]'>
            <Tabs defaultActiveKey='1' items={items} />
          </div>
        </div>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-black hidden lg:block'></div>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex justify-center items-center h-36 w-[80%] bg-[#A7A7A733] rounded-lg'>
            <Link className='text-primary underline text-lg font-semibold' to={'/'}>
              Link Đăng Kí
            </Link>
          </div>
          <div className='flex w-full items-center justify-around mt-10 lg:mt-60'>
            <Button type='primary' className='w-32 h-10' onClick={handleConfirmClose}>
              Hủy
            </Button>
            <Button type='primary' className='w-32 h-10' onClick={() => toast.success('Hoàn Thành')}>
              Hoàn Thành
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
