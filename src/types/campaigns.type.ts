export type Campaign = {
  id: number
  name: string
  image: string
  description: string
  address: string
  specificAddress: string
  startDate: string
  endDate: string
  donationRequirement: string
  coordinate: {
    lat: number
    lng: number
  }
}
