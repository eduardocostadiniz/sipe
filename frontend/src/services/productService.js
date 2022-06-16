import http from "./http";

export default {
  getProducts() {
    return http.get('/product')
  },
  getProductById(id) {
    return http.get(`/product/${id}`)
  },
  saveProduct(data) {
    return http.post('/product', data)
  }
}