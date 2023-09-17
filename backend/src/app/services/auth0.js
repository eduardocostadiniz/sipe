const qs = require('qs');

const { httpAuth0, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = require("./http");

async function getAdminToken() {
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

async function getUsers(accessToken, params) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }

  try {
    const response = await httpAuth0.get('/api/v2/users', { headers, params })

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
  const path = `/api/v2/users/${userId}`

  try {
    const response = await httpAuth0.get(path, { headers })

    return response.data

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

async function getUserByEmail(accessToken, email) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/api/v2/users?q=email.raw=${email}&search_engine=v2`

  try {
    const response = await httpAuth0.get(path, { headers })

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

  try {
    return await httpAuth0.post('/api/v2/users', data, { headers })

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

async function updateUser(accessToken, userId, data) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const path = `/api/v2/users/${userId}`

  try {
    return await httpAuth0.patch(path, data, { headers })

  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

module.exports = {
  getAdminToken,
  getUserByEmail,
  getUsers,
  createUser,
  getUserById,
  updateUser,
}