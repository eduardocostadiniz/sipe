const express = require('express');

const dbConnection = require('../../database');
const authMiddleware = require('../middlewares/auth');
const { UserProfile } = require('../constants');
const auth0Service = require('../services/auth0');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const { email } = req;

    const [result] = await dbConnection.query('select * from users where email = $1', [email]);
    if (!result) {
      return res.status(400).send({ error: 'User not found!' });
    }

    const products = await dbConnection.any(`select * from products`);

    console.log(products);

    res.send({ products })
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get products failed' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { email } = req;
    const { id } = req.params;

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

    const [product] = await dbConnection.query(`select * from products where id = $1`, [id]);

    res.send({ product });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get user failed' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email: userEmail } = req;
    const { id, name, description, price, imgUrl, isActive } = req.body;

    const [usr] = await dbConnection.query('select * from users where email = $1', [userEmail]);
    if (!usr) {
      return res.status(400).send({ error: 'User not found!' });
    }

    const data = await auth0Service.getAdminToken()
    const accessToken = data['access_token']

    const [auth0User] = await auth0Service.getUserByEmail(accessToken, userEmail);
    const userMetadata = auth0User.user_metadata || {}
    const profile = userMetadata.sipe && userMetadata.sipe.perfil || ''

    if (profile !== UserProfile.ADMIN) {
      return res.status(401).send({ error: 'User not authorized!' });
    }

    if (!id) {
      await dbConnection.none(
        'insert into products (name, description, price, img_url, is_active) values ($1, $2, $3, $4, $5)',
        [name, description, price, imgUrl, isActive]
      )
    } else {
      await dbConnection.none(
        'update products set name = $1, description = $2, price = $3, img_url = $4, is_active = $5 where id = $6',
        [name, description, price, imgUrl, isActive, id]
      )
    }

    return res.send({});

  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});

module.exports = app => app.use('/product', router);