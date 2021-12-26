import http from "./http";

export default {
  authUser(email, password) {
    return http.post('/auth/authenticate', { email, password });
  }
}