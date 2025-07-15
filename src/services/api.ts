import axios from 'axios'

const API_URL = "/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
})

export default api