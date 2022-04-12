import http from "./http";

export default {
  getUsers() {
    return http.get('/user')
  },
  saveUser(data) {
    return http.post('/user/save', data)
  },
  getUserInfo() {
    return http.get('/user/info');
  },
  getSettings() {
    return http.get('/user/settings');
  },
  saveSettings(formData) {
    const headers = { 'Content-Type': 'multipart/form-data' }
    return http.post('/user/settings', formData, headers);
  }
}