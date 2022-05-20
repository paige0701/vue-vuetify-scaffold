export default (axios) => ({
  getBestSellers(params) {
    return axios.get('/lists.json', { params });
  },
});
