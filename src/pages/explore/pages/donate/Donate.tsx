import { Button, Tabs, TabsProps } from 'antd'
import { useForm } from 'react-hook-form'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { DonationSchema, donationSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/input'
import UploadImage from 'src/components/uploadImage'
import path from 'src/constants/path'
import ao from 'src/assets/img/ao.png'

export interface DonateProps {}

type FormData = DonationSchema
const schema = donationSchema

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '1',
    children: (
      <div className='flex flex-col gap-8 items-center mt-6'>
        <img src={ao} alt='img' className='w-96 h-56 object-cover rounded-lg' />
        <div className='flex flex-col gap-2 items-center text-base'>
          <p className='font-bold'>
            Tên hiện vật: <span>Áo</span>
          </p>
          <p className='text-[#656070]'>
            Tình trạng: <span>Cũ memmmm</span>
          </p>
        </div>
        <span className='bg-[#D9D9D9] px-10 py-3 rounded-md w-max mt-2'>Chờ duyệt</span>
      </div>
    )
  },
  {
    key: '2',
    label: '2',
    children: (
      <div className='flex flex-col gap-8 items-center mt-6'>
        <img src={ao} alt='img' className='w-96 h-56 object-cover rounded-lg' />
        <div className='flex flex-col gap-2 items-center text-base'>
          <p className='font-bold'>
            Tên hiện vật: <span>Áo</span>
          </p>
          <p className='text-[#656070]'>
            Tình trạng: <span>Cũ memmmm</span>
          </p>
        </div>
        <span className='bg-[#D9D9D9] px-10 py-3 rounded-md w-max mt-2'>Chờ duyệt</span>
      </div>
    )
  },
  {
    key: '3',
    label: '3',
    children: (
      <div className='flex flex-col gap-8 items-center mt-6'>
        <img src={ao} alt='img' className='w-96 h-56 object-cover rounded-lg' />
        <div className='flex flex-col gap-2 items-center text-base'>
          <p className='font-bold'>
            Tên hiện vật: <span>Áo</span>
          </p>
          <p className='text-[#656070]'>
            Tình trạng: <span>Cũ memmmm</span>
          </p>
        </div>
        <span className='bg-[#D9D9D9] px-10 py-3 rounded-md w-max mt-2'>Chờ duyệt</span>
      </div>
    )
  },
  {
    key: '4',
    label: '4',
    children: (
      <div className='flex flex-col gap-8 items-center mt-6'>
        <img src={ao} alt='img' className='w-96 h-56 object-cover rounded-lg' />
        <div className='flex flex-col gap-2 items-center text-base'>
          <p className='font-bold'>
            Tên hiện vật: <span>Áo</span>
          </p>
          <p className='text-[#656070]'>
            Tình trạng: <span>Cũ memmmm</span>
          </p>
        </div>
        <span className='bg-[#D9D9D9] px-10 py-3 rounded-md w-max mt-2'>Chờ duyệt</span>
      </div>
    )
  },
  {
    key: '5',
    label: '5',
    children: (
      <div className='flex flex-col gap-8 items-center mt-6'>
        <img src={ao} alt='img' className='w-96 h-56 object-cover rounded-lg' />
        <div className='flex flex-col gap-2 items-center text-base'>
          <p className='font-bold'>
            Tên hiện vật: <span>Áo</span>
          </p>
          <p className='text-[#656070]'>
            Tình trạng: <span>Cũ memmmm</span>
          </p>
        </div>
        <span className='bg-[#D9D9D9] px-10 py-3 rounded-md w-max mt-2'>Chờ duyệt</span>
      </div>
    )
  }
]

export default function Donate(props: DonateProps) {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      status: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmitForm = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='pt-[4.5rem] pb-8'>
      <header className='fixed top-0 left-0 lg:left-64 w-full py-9 bg-[#D9FEFC] text-black text-xl font-bold uppercase z-10'>
        <Link
          to={`${path.explore}/${id}`}
          className='absolute top-1/2 -translate-y-1/2 right-5 lg:left-5 lg:right-[unset] cursor-pointer'
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
        </Link>
        <span className='absolute top-1/2 left-1/2 lg:left-[calc((100%-_16rem)_/_2)] -translate-x-1/2 -translate-y-1/2'>
          Quyên góp
        </span>
      </header>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-32 relative px-12 place-content-center min-h-[calc(100vh_-_4.5rem)]'>
        <div className='w-full flex flex-col gap-4 lg:gap-10 mt-6 lg:mt-0'>
          <h2 className='text-center text-2xl font-semibold'>Danh sách hiện vật</h2>
          <div className='border-1 border-[#ADADAD]'>
            <Tabs defaultActiveKey='1' items={items} size='small' />
          </div>
        </div>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-black hidden lg:block'></div>
        <div className='flex flex-col items-center justify-center'>
          <form onSubmit={handleSubmitForm} className='w-full flex flex-col gap-10 items-center'>
            <div className='flex flex-col w-full'>
              <Input
                type='text'
                placeholder='Tên hiện vật'
                id='floating_name'
                register={register}
                name='name'
                errors={errors.name?.message}
              />
              <Input
                type='text'
                placeholder='Tình trạng hiện vật'
                id='floating_status'
                register={register}
                name='status'
                errors={errors.status?.message}
              />
            </div>
            <UploadImage />
            <Button className='mt-8 h-12 px-10' type='primary' htmlType='submit'>
              Hoàn thành
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
