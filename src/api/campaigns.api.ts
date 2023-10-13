import { Campaign } from 'src/types/campaigns.type'
import http from 'src/utils/http'
import { Coordinate } from 'src/utils/utils'

const PATH = 'campaigns'

export const campaignsApi = {
  getCoordinates: () => http.get<Pick<Campaign, 'coordinate' | 'id' | 'name'>[]>(`${PATH}/coordinates`),
  getCampaigns: (params?: Coordinate) =>
    http.get<Campaign[]>(PATH, {
      params
    })
}
