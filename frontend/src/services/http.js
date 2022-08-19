import axios from 'axios';


const SIPE_BACKEND_URL = process.env.SIPE_BACKEND_URL;

const http = axios.create({
  baseURL: SIPE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
