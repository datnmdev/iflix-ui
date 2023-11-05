import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies(null, {
  path: '/'
})

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ cookies.get('accessToken') || cookies.get('refreshToken') }`
  }
})

export default axiosInstance