import http from "./http";

export default {
  getOrders() {
    return http.get('/order')
  },
  getOrderById(id) {
    return http.get(`/order/${id}`)
  },
}