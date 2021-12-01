const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Token not provided!' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Token error!' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted!' });
  }

  jwt.verify(token, authConfig.apiSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token is invalid!' });
    }

    req.userId = decoded.id;

    return next();
  })

};