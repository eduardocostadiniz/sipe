import http from "./http";

export default {
  getOrders() {
    return http.get('/order')
  },
  // getProductById(id) {
  //   return http.get(`/product/${id}`)
  // },
  // saveProduct(data) {
  //   return http.post('/product', data)
  // }
}