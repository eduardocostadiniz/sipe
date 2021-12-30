const express = require('express');

const dbConnection = require('../../database');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const { UserProfile } = require('../constants');
const { generateToken } = require('../utils');
const multerStorage = require('../modules/multer');

const router = express.Router();

router.use(authMiddleware);

const DEFAULT_AVATAR = 'http://192.168.100.62:8080/default.jpg'

router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    const [result] = await dbConnection.query('select * from users where email = $1', [email]);

    if (result) {
      return res.status(409).send({ error: 'User already exists!' });
    }

    const user = new User(req.body);
    user.profile = UserProfile.USER;
    await user.encryptPassword();

    await dbConnection.none(
      'insert into users(email, name, password, profile, avatar) values($1, $2, $3, $4, $5)',
      [user.email, user.name, user.password, user.profile, DEFAULT_AVATAR]
    )

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id })
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.get('/info', async (req, res) => {
  const email = req.userId;
  const [result] = await dbConnection.query('select * from users where email = $1 and is_active = true', [email]);

  if (!result) {
    return res.status(400).send({ error: 'User not found!' });
  }

  const user = new User(result);
  user.password = undefined;

  return res.send({ user });
});

router.get('/settings', async (req, res) => {
  const email = req.userId;

  const [result] = await dbConnection.query('select theme, avatar from users where email = $1', [email]);

  if (!result) {
    return res.status(400).send({ error: 'User does not exists!' });
  }

  const user = new User(result);
  user.password = undefined;

  return res.send({ user });
});

router.post('/settings', multerStorage.single('userAvatar'), async (req, res) => {
  const email = req.userId;
  const { theme } = req.body;
  const userAvatar = req.file;
  const fileWithPath = `http://192.168.100.62:8080/${userAvatar.filename}`;

  await dbConnection.none('update users set theme = $1, avatar=$2 where email = $3', [theme, fileWithPath, email]);

  const [result] = await dbConnection.query('select * from users where email = $1 and is_active = true', [email]);

  const user = new User(result);
  user.password = undefined;

  return res.send({ user });
});

module.exports = app => app.use('/user', router);