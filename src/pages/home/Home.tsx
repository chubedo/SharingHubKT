/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import Search from './components/search'
import { Modal } from 'antd'
import imageCampaign from 'src/assets/img/campaigns.png'

export interface HomeProps {}

type Position = {
  lat: number
  lng: number
}

export default function Home(props: HomeProps) {
  const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 })
  const [isModalPositionOpen, setIsModalPositionOpen] = useState<boolean>(false)

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY
  })

  const mapRef = useRef()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setPosition({ lat: latitude, lng: longitude })
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map
  }, [])

  const onShowModalPosition = () => {
    setIsModalPositionOpen(true)
  }
  const onCloseModalPosition = () => {
    setIsModalPositionOpen(false)
  }

  if (loadError) return 'error'
  if (!isLoaded) return 'Map'

  return (
    <div style={{ height: '100vh', width: '100%' }} className='relative'>
      <GoogleMap mapContainerStyle={{ height: '100%' }} center={position} zoom={13} onLoad={onMapLoad}>
        <MarkerF position={position} onClick={onShowModalPosition} />
      </GoogleMap>
      <Search />

      <Modal
        className='absolute top-0 right-0 !m-[unset] !pb-0 bg-white'
        open={isModalPositionOpen}
        onCancel={onCloseModalPosition}
        footer={null}
      >
        <div className='w-full min-h-[calc(100vh_-_40px)]'>
          <ul className='flex flex-col gap-6 mt-6 px-2'>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <li key={index}>
                  <div className='p-4 bg-[#F5F5F6] rounded-lg cursor-pointer'>
                    <div className='flex gap-8'>
                      <img src={imageCampaign} alt='img' className='w-36 h-36 object-cover object-center rounded-lg' />
                      <div className='flex flex-col gap-2 text-sm'>
                        <h2 className='font-bold text-xl text-[#3F3F3F]'>Xuân yêu thương</h2>
                        <span className='text-green-500'>Đang diễn ra</span>
                        <div className='flex gap-1 text-[#3F3F3F]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                            />
                          </svg>
                          <p>193 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
                        </div>
                        <div className='flex gap-1 text-[#3F3F3F]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
                            />
                          </svg>
                          <p>Trường Đại học Bách Khoa - Đại học Đè Nẵng</p>
                        </div>
                      </div>
                    </div>
                    <p className='text-[#747474] text-sm font-normal mt-4'>
                      Chiến dịch này nhằm mục tiêu hỗ trợ giáo dục cho trẻ em ở vùng nông thôn, nơi họ gặp nhiều khó
                      khăn trong việc tiếp cận giáo dục chất lượng. Chúng tôi cung cấp sách giáo trình, máy tính, và lớp
                      học ngoại khóa để giúp trẻ em có cơ hội học tốt hơn.
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </Modal>
    </div>
  )
}
