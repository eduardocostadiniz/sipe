import http from "./http";

export default {
  authUser(email, password) {
    return http.post('/auth/authenticate', { email, password });
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