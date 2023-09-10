import http from "./http";

export default {
  getUsers() {
    return http.get('/user')
  },
  getUserById(userId) {
    return http.get(`/user/${userId}`)
  },
  saveUser(data) {
    return http.post('/user', data)
  },
  getUserInfo() {
    return http.get('/user/current/info');
  },
  getSettings() {
    return http.get('/user/current/settings');
  },
  saveSettings(data) {
    return http.post('/user/current/settings', data);
  }
}