const express = require('express');

const dbConnection = require('../../database');
const User = require('../models/user');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
  const { email } = req.body;
  const [result] = await dbConnection.query('select * from users where email = $1', [email]);

  if (!result) {
    return res.status(400).send({ error: 'User not found!' });
  }

  const user = new User(result);

  return res.send({ user });
});

module.exports = app => app.use('/auth', router);