const axios = require('axios');

const AUTH0_URL = process.env.AUTH0_URL;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;

const httpAuth0 = axios.create({
  baseURL: AUTH0_URL
});

module.exports = { httpAuth0, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET };
