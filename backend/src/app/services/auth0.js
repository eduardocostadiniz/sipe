const qs = require('qs');

const { httpAuth0, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = require("./http");

async function getAdminToken(credentials) {
  const headers = {
    'Content-Type': 'application/json'
  }
  const data = qs.stringify({
	"client_id": AUTH0_CLIENT_ID,
	"client_secret": AUTH0_CLIENT_SECRET,
	"audience": AUTH0_AUDIENCE,
	"grant_type": "client_credentials"
  });

  try {
    const response = await httpAuth0.post('/oauth/token', data, headers)

    return response.data

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

// async function getUsers(accessToken, params) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`
//   }
//   const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users`

//   try {
//     const response = await httpKeycloak.get(path, { headers, params })

//     return response.data

//   } catch (error) {
//     console.log('error');
//     console.log(error);
//   }

// }

// async function getUserById(accessToken, userId) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`
//   }
//   const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}`

//   try {
//     const response = await httpKeycloak.get(path, { headers })

//     return response.data

//   } catch (error) {
//     console.log('error');
//     console.log(error);
//   }
// }

// async function getUserByEmail(accessToken, email) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`
//   }
//   const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users?email=${email}&exact=true`

//   try {
//     const response = await httpKeycloak.get(path, { headers })

//     return response.data

//   } catch (error) {
//     console.log('error');
//     console.log(error);
//   }
// }

// async function createUser(accessToken, data) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`
//   }
//   const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users`

//   try {
//     return await httpKeycloak.post(path, data, { headers })

//   } catch (error) {
//     console.log('error');
//     console.log(error);
//   }
// }

// async function getUserRoles(accessToken, userId, clientId) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`
//   }
//   const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}/role-mappings/clients/${clientId}`

//   try {
//     return await httpKeycloak.get(path, { headers })

//   } catch (error) {
//     console.log('error');
//     console.log(error);
//   }
// }

// async function listClientIdRoles(accessToken, userId, clientId) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`
//   }
//   const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}/role-mappings/clients/${clientId}/available`

//   try {
//     return await httpKeycloak.get(path, { headers })

//   } catch (error) {
//     console.log('error');
//     console.log(error);
//   }
// }

// async function getUserRoles(accessToken, userId, clientId) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`
//   }
//   const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}/role-mappings/clients/${clientId}`

//   try {
//     return await httpKeycloak.get(path, { headers })

//   } catch (error) {
//     console.log('error');
//     console.log(error);
//   }
// }

// async function updateUserRole(accessToken, userId, clientId, roles) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${accessToken}`
//   }
//   const path = `/auth/admin/realms/${KEYCLOAK_SIPE_REALM}/users/${userId}/role-mappings/clients/${clientId}`

//   try {
//     return await httpKeycloak.post(path, roles, { headers })

//   } catch (error) {
//     console.log('error');
//     console.log(error);
//   }
// }

module.exports = {
  getAdminToken,
}