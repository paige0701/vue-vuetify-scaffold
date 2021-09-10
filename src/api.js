import Vue from 'vue'
import NAVER from '@/api/naver'
import NYT from '@/api/nyt'
import axios from 'axios'

const naverInstance = axios.create({})

naverInstance.interceptors.request.use((config) => {
  config.headers['X-Naver-Client-Id'] = process.env.VUE_APP_ENV_X_NAVER_CLIENT_ID
  config.headers['X-Naver-Client-Secret'] = process.env.VUE_APP_ENV_X_NAVER_CLIENT_SECRET
  return config
})

const nytInstance = axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3'
})

nytInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    'api-key': process.env.VUE_APP_ENV_NEW_YORK_TIMES_API_KEY
  }
  return config
})




const factories = {
  naver: NAVER(naverInstance),
  nyt: NYT(nytInstance)
}

Vue.prototype.$api = factories
