import axios from 'axios'

export const naverInstance = axios.create({})

naverInstance.interceptors.request.use((config) => {
  config.headers['X-Naver-Client-Id'] = process.env.VUE_APP_ENV_X_NAVER_CLIENT_ID
  config.headers['X-Naver-Client-Secret'] = process.env.VUE_APP_ENV_X_NAVER_CLIENT_SECRET
  return config
})
