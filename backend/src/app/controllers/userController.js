const express = require('express');
const { uuid } = require('uuidv4');

const dbConnection = require('../../database');
const authMiddleware = require('../middlewares/auth');
const auth0Service = require('../services/auth0');
const User = require('../models/user');
const { UserProfile, UserAttributes } = require('../constants');

const router = express.Router();

router.use(authMiddleware);


router.get('/', async (req, res) => {
  try {
    const { email } = req;

    const [result] = await dbConnection.query('select * from users where email = $1', [email]);

    if (!result) {
      return res.status(400).send({ error: 'User not found!' });
    }

    const data = await auth0Service.getAdminToken()
    const accessToken = data['access_token']

    const [auth0User] = await auth0Service.getUserByEmail(accessToken, email);
    const userMetadata = auth0User.user_metadata || {}
    const profile = userMetadata.sipe && userMetadata.sipe.perfil || ''
    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    const auth0Users = await auth0Service.getUsers(accessToken, {})
    const users = auth0Users.map(item => new User(item))

    res.send({ users })
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get users failed' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { email } = req;
    const { id: userId } = req.params;

    const [result] = await dbConnection.query('select * from users where email = $1', [email]);

    if (!result) {
      return res.status(400).send({ error: 'User not found!' });
    }

    const data = await auth0Service.getAdminToken()
    const accessToken = data['access_token']

    const [auth0User] = await auth0Service.getUserByEmail(accessToken, email);
    const userMetadata = auth0User.user_metadata || {}
    const profile = userMetadata.sipe && userMetadata.sipe.perfil || ''
    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    const user = await auth0Service.getUserById(accessToken, userId)

    console.log('user');
    console.log(user);

    const searchedUser = new User(user)

    res.send({ ...searchedUser })
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get users failed' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email: userEmail } = req;
    const { email: formEmail, name, profile: role, enabled } = req.body;

    const data = await auth0Service.getAdminToken()
    const accessToken = data['access_token']

    const [auth0User] = await auth0Service.getUserByEmail(accessToken, userEmail);
    const userMetadata = auth0User.user_metadata || {}
    const profile = userMetadata.sipe && userMetadata.sipe.perfil || ''

    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    const [result] = await dbConnection.query('select * from users where email = $1', [formEmail]);
    if (!result) {
      await dbConnection.none(
        'insert into users(email, avatar) values($1, $2)',
        [formEmail, '']
      )
    } else {
      console.log('User already exists!');
    }

    let [formUser] = await auth0Service.getUserByEmail(accessToken, formEmail)

    if (!formUser) {
      const data = {
        email: formEmail,
        user_metadata: {
          sipe: {
            perfil: role,
            cnpjs: '12345678000125'
          }
        },
        name,
        blocked: !enabled,
        picture: UserAttributes.DEFAULT_AVATAR,
        connection: UserAttributes.DEFAULT_CONNECTION,
        password: uuid()
      }
      await auth0Service.createUser(accessToken, data)
    } else {
      const data = {
        email: formEmail,
        user_metadata: {
          sipe: {
            perfil: role,
            cnpjs: '12345678000125'
          }
        },
        name,
        blocked: !enabled
      }

      console.log('formUser.user_id, data');
      console.log(formUser.user_id, data);

      await auth0Service.updateUser(accessToken, formUser.user_id, data)
    }

    return res.status(201).send();

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

  const data = await auth0Service.getAdminToken()
  const accessToken = data['access_token']

  const [auth0User] = await auth0Service.getUserByEmail(accessToken, loggedEmail);
  const userMetadata = auth0User.user_metadata || {}
  const profile = userMetadata.sipe && userMetadata.sipe.perfil || ''
  const name = auth0User.name

  const { email, avatar, theme } = result;

  return res.send({ email, name, profile, avatar, theme });
});

router.get('/current/settings', async (req, res) => {
  const loggedEmail = req.email;

  const [result] = await dbConnection.query('select theme, avatar from users where email = $1', [loggedEmail]);

  if (!result) {
    return res.status(400).send({ error: 'User does not exists!' });
  }

  const { avatar, theme } = result;

  return res.send({ avatar, theme });
});

router.post('/current/settings', async (req, res) => {
  const loggedEmail = req.email;
  const { theme: themeForm, avatar: userAvatar } = req.body;


  await dbConnection.none('update users set theme = $1, avatar=$2 where email = $3', [themeForm, userAvatar, loggedEmail]);

  const [result] = await dbConnection.query('select theme, avatar from users where email = $1', [loggedEmail]);

  const { avatar, theme } = result;

  return res.send({ avatar, theme });
});

module.exports = app => app.use('/user', router);