import axios from 'axios';

const http = axios.create({
  baseURL: 'http://192.168.100.62:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
