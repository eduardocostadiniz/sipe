const express = require('express');
const bcrypt = require('bcryptjs');

const dbConnection = require('../../database');
const User = require('../models/user');
const { generateToken } = require('../utils');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const [result] = await dbConnection.query('select * from users where email = $1 and is_active = true', [email]);

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