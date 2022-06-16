const express = require('express');

const dbConnection = require('../../database');
const authMiddleware = require('../middlewares/auth');
const { UserProfile } = require('../constants');
const keycloakService = require('../services/keycloak');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const { email, profile } = req;

    const [result] = await dbConnection.query('select * from users where email = $1', [email]);
    if (!result) {
      return res.status(400).send({ error: 'User not found!' });
    }

    const data = await keycloakService.getToken({})
    const accessToken = data['access_token']

    const [kcUser] = await keycloakService.getUserByEmail(accessToken, email);
    const user = await keycloakService.getUserById(accessToken, kcUser.id);
    let clients = []

    if (profile === UserProfile.ADMIN) {
      clients = await dbConnection.query('select * from clients');
    } else {
      let allowedClients = [];
      try {
        allowedClients = user.attributes.clientCnpj[0].split(';')
        console.log(`\nAllowed to ${allowedClients}`);
      } catch (err) {
        console.error(`Get allowed clients to user ${email} : ${user.attributes}`)
        console.error(err);
      }

      clients = await dbConnection.any(`select * from clients where cnpj in ($1:list)`, [allowedClients]);
    }

    console.log(clients);

    res.send({ clients })
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get clients failed' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { email, profile } = req;
    const { id: cnpj } = req.params;

    const [result] = await dbConnection.query('select * from users where email = $1', [email]);

    if (!result) {
      return res.status(400).send({ error: 'User not found!' });
    }

    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    const [client] = await dbConnection.query(`select * from clients where cnpj = $1`, [cnpj]);

    res.send({ client });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get user failed' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email: userEmail, profile } = req;
    const { cnpj, name, trademark, email, phone, isActive } = req.body;

    console.log({ cnpj, name, trademark, email, phone, isActive });

    const [usr] = await dbConnection.query('select * from users where email = $1', [userEmail]);
    if (!usr) {
      return res.status(400).send({ error: 'User not found!' });
    }

    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    const [result] = await dbConnection.query('select * from clients where cnpj = $1', [cnpj]);

    console.log('\nresult');
    console.log(result);

    if (!result) {
      await dbConnection.none(
        'insert into clients (cnpj, name, trademark, email, phone, is_active) values ($1, $2, $3, $4, $5, $6)',
        [cnpj, name, trademark, email, phone, isActive]
      )
    } else {
      await dbConnection.none(
        'update clients set name = $1, trademark = $2, email = $3, phone = $4, is_active = $5 where cnpj = $6',
        [name, trademark, email, phone, isActive, cnpj]
      )
    }

    return res.send({});

  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});

module.exports = app => app.use('/client', router);