import Vue from 'vue';

const BASE_URL = `/api/v1/workouts`;
export default (axios) => ({
  workouts() {
    return axios.get(`${BASE_URL}`);
  },
  AddWorkout(params) {
    return axios.post(`${BASE_URL}/`, params);
  },
  deleteWorkout(id) {
    return axios.put(`${BASE_URL}/${id}/`);
  },
  workout(id) {
    return axios.get(`${BASE_URL}/${id}`);
  },
  updateWorkout(id, params) {
    return axios.post(`${BASE_URL}/${id}/`, params);
  },
  loginWithKakao(params) {
    return axios.post(`/api/v1/authentication/kakao/login/`, params);
  },
  logout() {
    return axios.post(`/api/v1/authentication/logout/`, {
      refresh_token: Vue.$cookies.get('refresh_token'),
    });
  },
  loginWithGoogle(params) {
    return axios.post(`/api/v1/authentication/google/login/`, params);
  },
  addRecord(params) {
    return axios.post(`/api/v1/records/`, params);
  },
  deleteRecord(id) {
    return axios.delete(`/api/v1/records/${id}`);
  },
  getRecords(date) {
    return axios.get(`/api/v1/records/${date}`);
  },
  getMonthlyRecord(date) {
    return axios.get(`api/v1/records/monthly/${date}`);
  },
});
