import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://host.docker.internal:8080/auth',
  realm: 'sipe',
  clientId: 'sipe-frontend',
  onLoad: 'login-required'
}

const initConfig = {
  onLoad: 'login-required'
}

const keycloak = new Keycloak(keycloakConfig);

export { keycloak, initConfig };

