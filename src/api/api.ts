import axios, { AxiosError } from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const api = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
})

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      return config
    } else {
      return Promise.reject({ message: 'request from server' })
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError) => {
    if (error.message === 'Network Error') {
      console.log('error')
      return
    }

    return Promise.reject(error)
  }
)

export default api
