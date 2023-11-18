import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { campaignsApi } from 'src/api/campaigns.api'
import { AppContext } from 'src/context/app.context'
import imageCampaign from 'src/assets/img/campaigns.png'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { Campaign } from 'src/types/campaigns.type'

export interface ManagementProps {}

export default function Management(props: ManagementProps) {
  const { profile } = useContext(AppContext)
  const idOrg = profile?.organizations[0].id
  const { data } = useQuery({
    queryKey: ['campaigns', 'organization', idOrg],
    queryFn: () => campaignsApi.getCampaignsOrg(idOrg as number),
    enabled: Boolean(idOrg)
  })
  const navigate = useNavigate()

  const handleClickCampaign = (id: number) => {
    navigate(`${path.explore}/${id}`)
  }

  const handleEdit = (campaign: Campaign, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    navigate(`${path.management}/${campaign.id}`, {
      state: campaign
    })
  }

  return (
    <div className='pt-[4.5rem] pb-8'>
      <header className='fixed top-0 left-0 lg:left-64 w-full py-9 bg-[#D9FEFC] text-black text-xl font-bold uppercase z-10'>
        <span className='absolute top-1/2 left-1/2 lg:left-[calc((100%-_16rem)_/_2)] -translate-x-1/2 -translate-y-1/2'>
          My Projects
        </span>
      </header>
      <div className='min-h-[calc(100vh_-_4.5rem)] p-8'>
        <ul className='flex flex-col gap-8'>
          {data?.data.map((campaign) => (
            <li
              key={campaign.id}
              className='flex flex-col md:flex-row gap-16 items-center justify-between p-8 shadow-[0px_5px_20px_0px_rgba(0,0,0,0.15)] rounded-xl cursor-pointer'
              onClick={() => handleClickCampaign(campaign.id)}
              aria-hidden
            >
              <div className='flex flex-col-reverse md:flex-row gap-8 items-center'>
                <img
                  src={campaign.image || imageCampaign}
                  alt='img'
                  className='w-full md:w-24 h-24 object-cover rounded-lg md:rounded-full'
                />
                <div className='flex flex-col justify-between gap-2 text-base'>
                  <h3 className='font-bold'>{campaign.name}</h3>
                  <p className='text-[#3B3B3B] text-justify'>{campaign.description}</p>
                </div>
              </div>
              <div onClick={(event) => handleEdit(campaign, event)} aria-hidden>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 hover:text-primary transition-all'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        className='fixed bottom-8 right-8 bg-[#D9FEFC] p-6 rounded-full'
        onClick={() => navigate(path.createCampaign)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 text-black'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
