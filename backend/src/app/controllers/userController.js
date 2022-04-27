const express = require('express');

const dbConnection = require('../../database');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const { UserProfile } = require('../constants');
const { generateToken } = require('../utils');
const multerStorage = require('../modules/multer');
const keycloakService = require('../services/keycloak');

const router = express.Router();

router.use(authMiddleware);

const DEFAULT_AVATAR = 'http://192.168.100.62:9090/default.jpg'
const SIPE_FRONTEND_CLIENT_ID = '79c14d2f-f337-47e5-9078-5885cf832893'


router.get('/', async (req, res) => {
  try {
    const { email, profile } = req;

    const [result] = await dbConnection.query('select * from users where email = $1', [email]);

    if (!result) {
      return res.status(400).send({ error: 'User not found!' });
    }

    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    // *************

    const data = await keycloakService.getToken({})
    const accessToken = data['access_token']

    const usersKC = await keycloakService.getUsers(accessToken, {})

    // *************

    const users = usersKC.map(item => new User(item))

    res.send({ users })
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get users failed' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { email, profile } = req;
    const { id: userId } = req.params;

    const [result] = await dbConnection.query('select * from users where email = $1', [email]);

    if (!result) {
      return res.status(400).send({ error: 'User not found!' });
    }

    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    // *************

    const data = await keycloakService.getToken({})
    const accessToken = data['access_token']
    const userKC = await keycloakService.getUserById(accessToken, userId)
    const { data: userRoleKC } = await keycloakService.getUserRoles(accessToken, userId, SIPE_FRONTEND_CLIENT_ID)

    // *************

    const userProfile = userRoleKC && userRoleKC[0] && userRoleKC[0].name
    const user = new User({ ...userKC, profile: userProfile })

    res.send({ ...user })
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get users failed' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { profile } = req;
    const { email: formEmail, firstName, lastName, profile: role, enabled } = req.body;

    const [result] = await dbConnection.query('select * from users where email = $1', [formEmail]);

    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    if (!result) {
      await dbConnection.none(
        'insert into users(email, name, avatar) values($1, $2, $3)',
        [formEmail, `${firstName} ${lastName}`, DEFAULT_AVATAR]
      )
    } else {
      console.log('User already exists!');
    }

    // *************

    const data = await keycloakService.getToken({})
    const accessToken = data['access_token']

    const params = {
      exact: true,
      email: formEmail
    }

    let userKc = await keycloakService.getUsers(accessToken, params)

    if (!userKc.length) {
      const data = {
        username: formEmail,
        email: formEmail,
        firstName,
        lastName,
        enabled,
        requiredActions: ['UPDATE_PASSWORD'],
        attributes: {
          clientCnpj: '12345678000125'
        }
      };

      const userResponse = await keycloakService.createUser(accessToken, data)

      const locationUrl = userResponse.headers['location'].split('/')
      const userId = locationUrl[locationUrl.length - 1]

      const roleResponse = await keycloakService.listClientIdRoles(accessToken, userId, SIPE_FRONTEND_CLIENT_ID)

      const { data: roles } = roleResponse;

      const roleObj = roles.find(el => el.name === role)

      await keycloakService.updateUserRole(accessToken, userId, SIPE_FRONTEND_CLIENT_ID, [roleObj])

      return res.status(201).send();

    } else {

    }

    // *************

    return res.send({ userKc });

  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.get('/current/info', async (req, res) => {
  const loggedEmail = req.email;
  const [result] = await dbConnection.query('select * from users where email = $1', [loggedEmail]);

  if (!result) {
    return res.status(400).send({ error: 'User not found!' });
  }

  const { email, avatar, name, theme } = result;

  return res.send({ email, name, avatar, theme });
});

router.get('/current/settings', async (req, res) => {
  const loggedEmail = req.email;

  const [result] = await dbConnection.query('select theme, avatar from users where email = $1', [loggedEmail]);

  if (!result) {
    return res.status(400).send({ error: 'User does not exists!' });
  }

  const { email, avatar, name, theme } = result;

  return res.send({ email, name, avatar, theme });
});

router.post('/current/settings', multerStorage.single('userAvatar'), async (req, res) => {
  const loggedEmail = req.email;
  const { theme: themeForm } = req.body;
  const userAvatar = req.file;
  const fileWithPath = `http://192.168.100.62:9090/${userAvatar.filename}`;

  await dbConnection.none('update users set theme = $1, avatar=$2 where email = $3', [themeForm, fileWithPath, loggedEmail]);

  const [result] = await dbConnection.query('select * from users where email = $1', [loggedEmail]);

  const { email, avatar, name, theme } = result;

  return res.send({ email, name, avatar, theme });
});

module.exports = app => app.use('/user', router);