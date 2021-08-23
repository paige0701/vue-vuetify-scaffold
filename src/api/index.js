import axios from 'axios'
import store from '@/store'

const nykInstance = axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3/'
})

