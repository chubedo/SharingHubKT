import { useQuery } from '@tanstack/react-query'
import imageCampaign from 'src/assets/img/campaigns.png'
import { Link, useParams } from 'react-router-dom'
import { campaignsApi } from 'src/api/campaigns.api'
import { format } from 'date-fns'
import { Campaign } from 'src/types/campaigns.type'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import path from 'src/constants/path'
import { campaignStatus, statusColor } from 'src/utils/utils'

export interface CampaignDetailsProps {}

export default function CampaignDetails(props: CampaignDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { id } = useParams()
  const { data: campaignsData } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => campaignsApi.getCampaigns()
  })
  const campaignDetailsData = campaignsData?.data.find((campaign) => campaign.id === Number(id))

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  if (!campaignDetailsData) {
    return null
  }
  return (
    <div className='pb-8 pt-[4.5rem]'>
      <header className='fixed top-0 left-0 lg:left-64 w-full py-9 bg-[#D9FEFC] text-black text-base lg:text-xl font-bold uppercase z-10'>
        <Link className='absolute top-1/2 -translate-y-1/2 right-5 lg:left-5 lg:right-[unset]' to={path.explore}>
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
        <span className='absolute top-1/2 left-1/2 lg:left-[calc((100%-_16rem)_/_2)] -translate-x-1/2 -translate-y-1/2 text-center'>
          {campaignDetailsData?.name}
        </span>
      </header>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-32 relative px-4 lg:px-12 min-h-screen place-content-center'>
        <div className='w-full flex flex-col justify-center'>
          <div>
            <img
              src={campaignDetailsData?.image || imageCampaign}
              alt='img'
              className='w-full h-60 object-cover rounded-2xl'
            />
          </div>
          <h1 className='mt-4 text-xl font-bold text-center'>{campaignDetailsData?.name}</h1>
          <p className='mt-4 flex items-end gap-2'>
            <span className={statusColor(campaignDetailsData.startDate, campaignDetailsData.endDate)}>
              {campaignStatus(campaignDetailsData.startDate, campaignDetailsData.endDate)}
            </span>{' '}
            <span className='font-semibold'>{format(new Date(campaignDetailsData.endDate), 'dd/MM/yyyy')}</span>
          </p>
          <div className='mt-6 flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-semibold text-lg'>Location</h2>
              <p className='text-[#747474] text-base'>{campaignDetailsData.specificAddress}</p>
            </div>
            <div className='flex gap-4'>
              <img src={imageCampaign} alt='img' className='w-20 h-20 rounded-lg object-cover' />
              <div className='flex flex-col justify-between py-1'>
                <span className='text-primary font-semibold text-base'>Trường Đại học Bách Khoa - Đại học Đà Nẵng</span>
                <div className='flex gap-4'>
                  <span className='text-base font-semibold'>Rate: </span>
                  <ul className='flex gap-2 items-center'>
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <li key={index}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className='flex items-center justify-center ml-6 cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-7 h-7'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 mt-6'>
            <h2 className='font-semibold text-lg'>Descriptions</h2>
            <ul className='list-disc text-[#747474] text-base pl-8 text-justify'>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <li key={index}>{campaignDetailsData.description}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-black hidden lg:block'></div>
        <div className='w-full flex flex-col gap-6 justify-center'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <h2 className='font-semibold text-lg'>Danh sách người ủng hộ</h2>
              <span className='text-[#747474] text-sm italic'>Cập nhật đến ngày xx/xx/xxxx</span>
            </div>
            <div className='flex flex-col gap-4'>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className='flex items-center justify-between' key={index}>
                    <div className='flex gap-4 items-center'>
                      <img
                        src={imageCampaign}
                        alt='img'
                        className='w-10 h-10 object-cover rounded-full object-center'
                      />
                      <span className='font-semibold text-base italic'>Pham Tuyen</span>
                    </div>
                    <span className='font-semibold text-base italic'>xxxxxxx680</span>
                  </div>
                ))}
            </div>
            <div className='text-center font-semibold'>Xem thêm</div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <h2 className='font-semibold text-lg'>Danh sách tình nguyện viên</h2>
              <span className='text-[#747474] text-sm italic'>Cập nhật đến ngày xx/xx/xxxx</span>
            </div>
            <div className='flex flex-col gap-4'>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className='flex items-center justify-between' key={index}>
                    <div className='flex gap-4 items-center'>
                      <img
                        src={imageCampaign}
                        alt='img'
                        className='w-10 h-10 object-cover rounded-full object-center'
                      />
                      <span className='font-semibold text-base italic'>Pham Tuyen</span>
                    </div>
                    <span className='font-semibold text-base italic'>xxxxxxx680</span>
                  </div>
                ))}
            </div>
            <div className='text-center font-semibold'>Xem thêm</div>
          </div>
        </div>
      </div>
      <div className='text-center mt-4'>
        {campaignStatus(campaignDetailsData.startDate, campaignDetailsData.endDate) === 'Đã kết thúc' ? (
          <div className='flex flex-col gap-16 mt-8'>
            <div className='flex flex-col'>
              <h2 className='font-semibold text-xl'>Dự án review</h2>
              <ul className='flex justify-center gap-8 mt-4'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li key={index} className='cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-8 h-8'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                        />
                      </svg>
                    </li>
                  ))}
              </ul>
            </div>
            <div className='flex flex-col'>
              <h2 className='font-semibold text-xl'>Tổ chức review</h2>
              <ul className='flex justify-center gap-8 mt-4'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li key={index} className='cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-8 h-8'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                        />
                      </svg>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          <button className='w-1/2 p-4 rounded-lg text-white' onClick={showModal}>
            Tham gia
          </button>
        )}
      </div>
      <Modal className='!top-1/3' title='Tham gia' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className='flex items-center justify-center gap-6'>
          <Link to={`${path.explore}/${id}/volunteer`}>
            <Button type='primary' className='h-12 px-6 text-white text-base'>
              Tình Nguyện
            </Button>
          </Link>
          <Link to={`${path.explore}/${id}/donate`}>
            <Button className='!bg-[#C2C3C7] h-12 px-6 hover:!bg-[#C2C3C7] hover:opacity-80 text-base transition-all'>
              Quyên Góp
            </Button>
          </Link>
        </div>
      </Modal>
    </div>
  )
}
