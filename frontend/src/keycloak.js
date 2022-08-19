import Keycloak from 'keycloak-js';

const SIPE_KEYCLOAK_URL = process.env.SIPE_KEYCLOAK_URL;
const SIPE_KEYCLOAK_REALM = process.env.SIPE_KEYCLOAK_REALM;
const SIPE_FRONTEND_CLIENT_ID = process.env.SIPE_FRONTEND_CLIENT_ID;

const keycloakConfig = {
  url: SIPE_KEYCLOAK_URL,
  realm: SIPE_KEYCLOAK_REALM,
  clientId: SIPE_FRONTEND_CLIENT_ID,
  onLoad: 'login-required'
}

const initConfig = {
  onLoad: 'login-required'
}

const keycloak = new Keycloak(keycloakConfig);

export { keycloak, initConfig };
