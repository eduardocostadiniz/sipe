const qs = require('qs');

const { httpKeycloak, KEYCLOAK_SIPE_REALM, ADMIN_CLIENT_ID, ADMIN_CLIENT_SECRET } = require("./http");

async function getToken(credentials) {
  const clientId = credentials.clientId || ADMIN_CLIENT_ID
  const clientSecret = credentials.clientSecret || ADMIN_CLIENT_SECRET
  const path = `/auth/realms/${KEYCLOAK_SIPE_REALM}/protocol/openid-connect/token`
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const data = qs.stringify({
    'scope': 'openid',
    'grant_type': 'client_credentials',
    'client_id': clientId,
    'client_secret': clientSecret
  });

  try {
    const response = await httpKeycloak.post(path, data, headers)

    return response.data

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

async function getUsers(accessToken, params) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users`

  try {
    const response = await httpKeycloak.get(path, { headers, params })

    return response.data

  } catch (error) {
    console.log('error');
    console.log(error);
  }

}

async function getUserById(accessToken, userId) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}`

  try {
    const response = await httpKeycloak.get(path, { headers })

    return response.data

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

async function createUser(accessToken, data) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users`

  try {
    return await httpKeycloak.post(path, data, { headers })

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

async function getUserRoles(accessToken, userId, clientId) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}/role-mappings/clients/${clientId}`

  try {
    return await httpKeycloak.get(path, { headers })

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

async function listClientIdRoles(accessToken, userId, clientId) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}/role-mappings/clients/${clientId}/available`

  try {
    return await httpKeycloak.get(path, { headers })

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

async function getUserRoles(accessToken, userId, clientId) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}/role-mappings/clients/${clientId}`

  try {
    return await httpKeycloak.get(path, { headers })

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

async function updateUserRole(accessToken, userId, clientId, roles) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}/role-mappings/clients/${clientId}`

  try {
    return await httpKeycloak.post(path, roles, { headers })

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

module.exports = {
  getToken,
  getUsers,
  getUserById,
  getUserRoles,
  createUser,
  listClientIdRoles,
  updateUserRole
}