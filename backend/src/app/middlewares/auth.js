const jwt = require('jsonwebtoken');
const { Column } = require('pg-promise');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

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

    req.userId = decoded.email;

    return next();
  })

};