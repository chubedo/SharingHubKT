import axios, { AxiosError, HttpStatusCode } from 'axios'

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
export const isAxiosErrorUnprocessableEntity = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.status === HttpStatusCode.UnprocessableEntity
}

export type Coordinate = { lng?: string; lat?: string; name?: string }

export const campaignStatus = (start: string, end: string) => {
  const now = new Date()
  const start_date = new Date(start)
  const end_date = new Date(end)
  if (now < start_date) {
    return 'Chưa diễn ra'
  } else {
    if (now <= end_date) {
      return 'Đang diễn ra'
    } else {
      return 'Đã kết thúc'
    }
  }
}

export const statusColor = (start: string, end: string) => {
  const status = campaignStatus(start, end)
  if (status === 'Chưa diễn ra') {
    return 'text-[#747474]'
  }
  if (status === 'Đang diễn ra') {
    return 'text-green-500'
  }
  if (status === 'Đã kết thúc') {
    return 'text-red-500'
  }
}
