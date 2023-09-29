export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const getAccessTokenFormLS = () => {
  return localStorage.getItem('accessToken') || ''
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
}
