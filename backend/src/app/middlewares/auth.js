const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');


const auth0 = jwksClient({
  jwksUri: `${process.env.AUTH0_URL}/.well-known/jwks.json`,
  timeout: 10000
});

async function getPublicKey(kid) {
  const key = await auth0.getSigningKey(kid);
  return await key.getPublicKey();
}

module.exports = async (req, res, next) => {
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

  const tokenDecoded = await jwt.decode(token, {complete: true})
  const tokenKid = tokenDecoded.header.kid
  const publicKey = await getPublicKey(tokenKid)

  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log('Token is invalid!');
      return res.status(401).send({ error: 'Token is invalid!' });
    }

    const allowedRequesters = process.env.AUTH0_SIPE_ALLOWED_REQUESTERS.split(',')
    if (!allowedRequesters.includes(decoded.aud)) {
      console.log('Invalid Requester');
      return res.status(403).send({ error: 'Invalid Requester!' });
    }

    req.email = decoded.email || ''

    return next();
  })

};