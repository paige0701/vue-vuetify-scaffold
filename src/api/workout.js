export default axios => ({
  workouts() {
    return axios.get(`/api/v1/workouts`)
  },
  AddWorkout(params) {
    return axios.post('/api/v1/workouts/', params)
  },
  deleteWorkout(id) {
    return axios.put(`/api/v1/workouts/${id}/`)
  }
})
