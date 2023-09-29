/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { MdLocationOn } from 'react-icons/md'
export interface HomeProps {}

type Position = {
  lat: number
  lng: number
}

export default function Home(props: HomeProps) {
  const [position, setPosition] = useState<Position>({ lat: 0, lng: 0 })
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY
  })

  const mapRef = useRef()

  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map
  }, [])

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

  if (loadError) return 'error'
  if (!isLoaded) return 'Map'

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap mapContainerStyle={{ height: '100%' }} center={position} zoom={10} onLoad={onMapLoad}>
        <MarkerF position={position} />
      </GoogleMap>
    </div>
  )
}
