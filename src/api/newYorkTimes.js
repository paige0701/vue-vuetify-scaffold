import axios from 'axios'

const nykInstance = axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3'
})

nykInstance.interceptors.request.use((config) => {
  console.info('config ?? ', config)
  config.params = {
    ...config.params,
    'api-key': 'jSpyayJisA4vg2TrhEe6GvdGeFwfnSla'
  }
  console.info('config ?? ', config)
  return config
})

export default nykInstance
