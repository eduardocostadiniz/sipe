const express = require('express');
const bcrypt = require('bcryptjs');

const dbConnection = require('../../database');
const User = require('../models/user');
const { UserProfile } = require('../constants');
const { generateToken } = require('../utils');

const router = express.Router();

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
      'insert into users(email, name, password, profile) values($1, $2, $3, $4)',
      [user.email, user.name, user.password, user.profile]
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

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const [result] = await dbConnection.query('select * from users where email = $1', [email]);

  if (!result) {
    return res.status(400).send({ error: 'User not found!' });
  }

  const user = new User(result);

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'User invalid!' });
  }

  user.password = undefined;

  return res.send({
    user,
    token: generateToken({ id: user.email })
  });
});

module.exports = app => app.use('/auth', router);