import { Campaign } from 'src/types/campaigns.type'
import http from 'src/utils/http'
import { Coordinate } from 'src/utils/utils'

const PATH = 'campaigns'

export const campaignsApi = {
  getCoordinates: () => http.get<Pick<Campaign, 'coordinate' | 'id' | 'name'>[]>(`${PATH}/coordinates`),
  getCampaigns: (params?: Coordinate) =>
    http.get<Campaign[]>(PATH, {
      params
    }),
  getCampaignsOrg: (idOrg: number) => http.get<Campaign[]>(`organizations/${idOrg}/${PATH}`),
  postCampaign: (idOrg: number, body: Omit<Campaign, 'id' | 'image'>) =>
    http.post<{
      message: string
      id: number
    }>(`organizations/${idOrg}/${PATH}`, body),
  patchCampaign: (idOrg: number, idCampaign: number, body: Omit<Campaign, 'id' | 'image'>) =>
    http.patch<{
      message: string
      id: number
    }>(`organizations/${idOrg}/${PATH}/${idCampaign}`, body)
}
