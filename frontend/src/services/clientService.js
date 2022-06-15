import http from "./http";

export default {
  getClients() {
    return http.get('/client')
  },
  getClientByCnpj(cnpj) {
    return http.get(`/client/${cnpj}`)
  },
  saveClient(data) {
    return http.post('/client', data)
  }
}