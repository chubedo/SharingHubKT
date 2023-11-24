/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import Search from './components/search'
import { Modal } from 'antd'
import imageCampaign from 'src/assets/img/campaigns.png'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { campaignsApi } from 'src/api/campaigns.api'
import useQueryParams from 'src/hooks/useQueryParams'
import { Coordinate } from 'src/utils/utils'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import Campaigns from 'src/components/campaigns'

export interface HomeProps {}

type Position = {
  lat: number
  lng: number
}

export default function Home(props: HomeProps) {
  const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 })
  const [isModalCampaignsOpen, setIsModalCampaignsOpen] = useState<boolean>(false)
  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data } = useQuery({
    queryKey: ['coordinates'],
    queryFn: () => campaignsApi.getCoordinates()
  })

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY
  })

  const mapRef = useRef()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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

  const onShowModalCampaigns = (lat: number, lng: number) => {
    setIsModalCampaignsOpen(true)
    navigate({
      pathname: path.home,
      search: createSearchParams({
        lat: lat.toString(),
        lng: lng.toString()
      }).toString()
    })
  }
  const onCloseModalCampaigns = () => {
    setSearchParams('')
    setIsModalCampaignsOpen(false)
  }

  if (loadError) return 'error'
  if (!isLoaded) return 'Map'

  return (
    <div style={{ height: '100vh', width: '100%' }} className='relative'>
      <GoogleMap mapContainerStyle={{ height: '100%' }} center={position} zoom={13} onLoad={onMapLoad}>
        {data &&
          data?.data.map((campaign) => (
            <MarkerF
              key={campaign.id}
              position={{ lat: campaign.coordinate.lat, lng: campaign.coordinate.lng }}
              onClick={() => onShowModalCampaigns(campaign.coordinate.lat, campaign.coordinate.lng)}
              title='point'
            />
          ))}
      </GoogleMap>
      <Search />
      <div>ok</div>

      <Modal
        className='absolute top-0 right-0 !m-[unset] !pb-0 bg-white'
        open={isModalCampaignsOpen}
        onCancel={onCloseModalCampaigns}
        footer={null}
      >
        <div className='w-full min-h-[calc(100vh_-_64px)]'>
          <Campaigns queryParams={queryParams as Coordinate} />
        </div>
      </Modal>
    </div>
  )
}
