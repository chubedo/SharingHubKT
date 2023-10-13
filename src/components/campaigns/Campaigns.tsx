import { Coordinate } from 'src/utils/utils'
import imageCampaign from 'src/assets/img/campaigns.png'
import { useQuery } from '@tanstack/react-query'
import { campaignsApi } from 'src/api/campaigns.api'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export interface CampaignsProps {
  queryParams?: Coordinate
  classNameWrapper?: string
  classNameImage?: string
  noCampaigns?: React.ReactNode
}

export default function Campaigns({ queryParams, classNameWrapper, classNameImage, noCampaigns }: CampaignsProps) {
  const { data: campaignsData } = useQuery({
    queryKey: ['campaigns', queryParams],
    queryFn: () => campaignsApi.getCampaigns(queryParams)
  })

  return (
    <>
      {!campaignsData ? (
        <p className='flex items-center justify-center text-xl mt-10'>loading....</p>
      ) : campaignsData.data.length > 0 ? (
        <ul className={`flex flex-col gap-6 mt-6 px-2 ${classNameWrapper}`}>
          {campaignsData.data.map((campaign) => (
            <li key={campaign.id}>
              <Link to={`${path.explore}/${campaign.id}`}>
                <div className='p-4 bg-[#F5F5F6] rounded-lg cursor-pointer'>
                  <div className='flex gap-8'>
                    <img
                      src={campaign.image || imageCampaign}
                      alt='img'
                      className={`w-36 h-36 object-cover object-center rounded-lg ${classNameImage}`}
                    />
                    <div className='flex flex-col gap-2 text-sm'>
                      <h2 className='font-bold text-xl text-[#3F3F3F]'>{campaign.name}</h2>
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
                        <p>{campaign.address}</p>
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
                  <p className='text-[#747474] text-sm font-normal mt-4'>{campaign.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>{noCampaigns}</div>
      )}
    </>
  )
}
