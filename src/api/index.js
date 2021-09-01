import axios from 'axios'

export const naverInstance = axios.create({
  baseURL: 'https://openapi.naver.com/v1'
})

naverInstance.interceptors.request.use((config) => {
  console.info('config ?? ', config)
  config.params = {
    ...config.params,
    'X-Naver-Client-Id': process.env.VUE_APP_ENV_X_NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.VUE_APP_ENV_X_NAVER_CLIENT_SECRET
  }
  console.info('config ?? ', config)
  return config
})
