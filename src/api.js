import Vue from 'vue'
import NAVER from '@/api/naver'
import NYT from '@/api/nyt'
import WORKOUT from '@/api/workout'
import axios from 'axios'
import router from './router'
const naverInstance = axios.create({})

naverInstance.interceptors.request.use((config) => {
  config.headers['X-Naver-Client-Id'] = process.env.VUE_APP_ENV_X_NAVER_CLIENT_ID
  config.headers['X-Naver-Client-Secret'] = process.env.VUE_APP_ENV_X_NAVER_CLIENT_SECRET
  return config
})

const nytInstance = axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3'
})

const baseAxiosInstance = axios.create({})
baseAxiosInstance.interceptors.response.use( (response) => {
  // Return a successful response back to the calling service
  return response;
}, (error) => {
  // Return any error which is not due to authentication back to the calling service
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Logout user if token refresh didn't work or user is disabled
  if (error.config.url === '/api/v1/authentication/token/refresh/') {

    Vue.$cookies.set('access_token', '')
    Vue.$cookies.set('refresh_token', '')
    router.push({name: 'SignInMethods'})

    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return baseAxiosInstance.post(`/api/v1/authentication/token/refresh/`, {
    refresh: Vue.$cookies.get('refresh_token')
  })
    .then(({data}) => {
      console.info(`token ? ${data.access}`)
      console.info(`error ? ${error}`)

      // New request with new token
      const config = error.config;
      config.headers['Authorization'] = `Bearer ${data.access}`;

      return new Promise((resolve, reject) => {
        axios.request(config).then(response => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      });

    })
    .catch((error) => {
      Promise.reject(error);
    });
});


baseAxiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Vue.$cookies.get('access_token')}`
  return config
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
  nyt: NYT(nytInstance),
  workout: WORKOUT(baseAxiosInstance)
}

Vue.prototype.$api = factories
