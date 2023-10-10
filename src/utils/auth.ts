import { Profile } from 'src/types/user.type'

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}
export const setProfileToLS = (user: Profile) => {
  localStorage.setItem('profile', JSON.stringify(user))
}

export const getAccessTokenFormLS = () => {
  return localStorage.getItem('accessToken') || ''
}
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('profile')
}
