import { UserData } from 'src/types/user.type'

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}
export const setProfileToLS = (user: UserData) => {
  localStorage.setItem('profile', JSON.stringify(user))
}
export const setStatusToLS = (isOrganization: boolean) => {
  localStorage.setItem('isOrganization', JSON.stringify(isOrganization))
}

export const getAccessTokenFormLS = () => {
  return localStorage.getItem('accessToken') || ''
}
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const getStatusTokenFormLS = () => {
  return localStorage.getItem('isOrganization') || ''
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('profile')
  localStorage.removeItem('isOrganization')
}
