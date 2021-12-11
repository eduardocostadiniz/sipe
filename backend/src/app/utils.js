const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

async function generatePassword(raw_password) {
  const newHash = await bcrypt.hash(raw_password, 10);

  return newHash;
}


function generateToken(params = {}) {
  return jwt.sign(params, authConfig.apiSecret, {
    expiresIn: 86400
  });
}

module.exports = {
  transformaObjectKeys,
  generatePassword,
  generateToken
}