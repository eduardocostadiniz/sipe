const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/auth.json');
const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.apiSecret, {
    expiresIn: 86400
  });
}

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);

    // TODO: procurar na base de dados
    // if (user) {
    //   return res.status(409).send({ error: 'User already exists!' })
    // }

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

  const user = new User({ email, password });

  // TODO: procurar na base de dados
  // if (!user) {
  //   return res.status(400).send({ error: 'User not found!' });
  // }

  // if (!await bcrypt.compare(password, user.password)) {
  //   return res.status(400).send({ error: 'User invalid!' });
  // }

  user.password = undefined;

  return res.send({
    user,
    token: generateToken({ id: user.id })
  });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = new User({ email });

    if (!user) {
      return res.status(400).send({ error: 'User not found!' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const expireToken = new Date();
    expireToken.setHours(expireToken.getHours() + 1);

    // TODO: salvar no banco de dados

    return res.status(204).send();

  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Forgot password failed' });
  }
})

router.post('/reset-password', async (req, res) => {
  const { email, token, password } = req.body;
  const now = new Date();

  try {
    const user = User(req.body);

    if (!user) {
      return res.status(400).send({ error: 'User not found!' });
    }

    if ((token !== user.passwordResetToken) || (now > user.passwordResetExpires)) {
      console.log(token, user.passwordResetToken)
      console.log(now, user.passwordResetExpires)
      return res.status(400).send({ error: 'Cannot reset password!' });
    }

    user.password = password;

    // TODO: salvar no banco de dados

    return res.status(204).send();

  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Reset password failed' });
  }
})

module.exports = app => app.use('/auth', router);