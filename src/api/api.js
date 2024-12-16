import axios from 'axios'
import config from '../utils/config'
const local = config.API_URL
const production = ''

const api = axios.create({
  baseURL: `${local}/api`
})

export default api
