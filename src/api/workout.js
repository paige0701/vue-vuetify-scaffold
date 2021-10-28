const BASE_URL = `/api/v1/workouts`
export default axios => ({
  workouts() {
    return axios.get(`${BASE_URL}`)
  },
  AddWorkout(params) {
    return axios.post(`${BASE_URL}/`, params)
  },
  deleteWorkout(id) {
    return axios.put(`${BASE_URL}/${id}/`)
  },
  workout(id) {
    return axios.get(`${BASE_URL}/${id}`)
  },
  updateWorkout(id, params) {
    return axios.post(`${BASE_URL}/${id}/`, params)
  },
  loginWithKakao(params) {
    return axios.post(`/api/v1/authentication/kakao/login/`, params)
  },
})
