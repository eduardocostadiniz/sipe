const axios = require('axios');



const KEYCLOAK_SIPE_URL = process.env.KEYCLOAK_SIPE_URL;
const KEYCLOAK_SIPE_REALM = process.env.KEYCLOAK_SIPE_REALM;
const ADMIN_CLIENT_ID = process.env.ADMIN_CLIENT_ID;
const ADMIN_CLIENT_SECRET = process.env.ADMIN_CLIENT_SECRET;

const httpKeycloak = axios.create({
  baseURL: KEYCLOAK_SIPE_URL
});

module.exports = { httpKeycloak, KEYCLOAK_SIPE_REALM, ADMIN_CLIENT_ID, ADMIN_CLIENT_SECRET };
