const jwt = require('jsonwebtoken');
const { UserProfile } = require('../constants');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const sipeFrontendClientId = process.env.SIPE_FRONTEND_CLIENT_ID;

  if (!authHeader) {
    console.log('Token not provided!');
    return res.status(401).send({ error: 'Token not provided!' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    console.log('Token error!');
    return res.status(401).send({ error: 'Token error!' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    console.log('Token malformatted!');
    return res.status(401).send({ error: 'Token malformatted!' });
  }

  jwt.verify(token, process.env.SIPE_PUBLIC_KEY, (err, decoded) => {
    if (err) {
      console.log('Token is invalid!');
      return res.status(401).send({ error: 'Token is invalid!' });
    }

    if (decoded.azp !== sipeFrontendClientId) {
      console.log('Invalid Requester');
      return res.status(403).send({ error: 'Invalid Requester!' });
    }

    const userRoles = decoded.resource_access && decoded.resource_access[sipeFrontendClientId] || []

    if (!userRoles || !userRoles.roles || !userRoles.roles.find((role) => (role === UserProfile.USER || role === UserProfile.ADMIN))) {
      console.log('Invalid Roles');
      return res.status(403).send({ error: 'Invalid Roles!' });
    }

    req.email = decoded.email;
    req.profile = userRoles.roles[0]

    return next();
  })

};