import axios from 'axios'
import { toast } from 'react-toastify'

export const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL
})

export let axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL
})

axiosPrivate.interceptors.request.use(function (config) {
  config.withCredentials = true
  return config
})

axiosPrivate.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    if (error?.response?.status === 422) {
      toast.info('Company information missing')
      window.location.href = error.response.data.redirectTo
    }

    if (error?.response?.status === 401) {
      const currentPage = window.location.pathname
      if (currentPage === '/login') return

      window.location.href = '/login'
      toast.info('Your session has expired. Please log in again.')
    }

    return Promise.reject(error)
  }
)

export async function retryRequest<T>(
  maxRetries: number,
  delay: number,
  fn: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn(...args)
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  throw new Error('Max retries exceeded')
}
