export default axios => ({
  workouts() {
    return axios.get(`/api/v1/workouts`)
  }
})
