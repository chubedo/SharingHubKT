import { toast } from 'react-toastify'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import path from 'src/constants/path'
import { LoginResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFormLS, setAccessTokenToLS, setProfileToLS, setStatusToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFormLS()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const pathUrl = 'auth' + path.login
        if (response.config.url === pathUrl) {
          const data = response.data as LoginResponse
          this.accessToken = data.accessToken
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.user)
          setStatusToLS(false)
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const errorMessage = data?.message || error.message
          toast.error(errorMessage)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
