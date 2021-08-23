import nytAPI from './newYorkTimes'

export const getBestSellers = (params) => {
  console.info('params --', params)
  return nytAPI.get('/lists.json', {params})
}
