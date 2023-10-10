import { toast } from 'react-toastify'
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import path from 'src/constants/path'
import { LoginResponse } from 'src/types/auth.type'
import { clearLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { omit } from 'lodash'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.response.use(
      (response) => {
        const pathUrl = 'auth' + path.login
        if (response.config.url === pathUrl) {
          const data = response.data as LoginResponse
          setAccessTokenToLS(data.accessToken)
          setProfileToLS(omit(data.user, ['organizations']))
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
