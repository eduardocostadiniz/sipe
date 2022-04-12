const axios = require('axios');


const KEYCLOAK_SIPE_URL = 'http://localhost:8080'
const KEYCLOAK_SIPE_REALM = 'sipe'
const ADMIN_CLIENT_ID = 'sipe-backend'
const ADMIN_CLIENT_SECRET = 'CDI1PLLtyS86tJCILgQCjMNDG0CryPVf'


const httpKeycloak = axios.create({
  baseURL: KEYCLOAK_SIPE_URL
});

module.exports = { httpKeycloak, KEYCLOAK_SIPE_REALM, ADMIN_CLIENT_ID, ADMIN_CLIENT_SECRET };
