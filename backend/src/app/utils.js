const jwt = require('jsonwebtoken');
const camelcase = require('camelcase');

const authConfig = require('../config/auth.json');

function transformaObjectKeys(data) {
  const newObject = {}
  const keys = Object.keys(data)

  keys.forEach(key => {
    newObject[camelcase(key)] = data[key]
  })

  return newObject
}

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.apiSecret, {
    expiresIn: 86400
  });
}

module.exports = {
  transformaObjectKeys,
  generateToken
}