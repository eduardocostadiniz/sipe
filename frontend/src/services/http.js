import axios from 'axios';

const http = axios.create({
  baseURL: 'http://192.168.100.62:9090',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
