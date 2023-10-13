export type Campaign = {
  id: number
  name: string
  image: null
  description: string
  address: string
  specificAddress: string
  startDate: string
  endDate: string
  coordinate: {
    lat: number
    lng: number
  }
}
