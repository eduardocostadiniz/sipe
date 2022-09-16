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
    let orders = []

    if (profile === UserProfile.ADMIN) {
      orders = await dbConnection.query('select * from orders');
    } else {
      let allowedClients = [];
      try {
        allowedClients = user.attributes.clientCnpj[0].split(';')
        console.log(`\nAllowed to ${allowedClients}`);
      } catch (err) {
        console.error(`Get allowed clients to user ${email} : ${user.attributes}`)
        console.error(err);
      }

      orders = await dbConnection.any(`select * from orders where cnpj in ($1:list)`, [allowedClients]);
    }

    res.send({ orders })
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get clients failed' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { email } = req;
    const { id: orderId } = req.params;

    const [result] = await dbConnection.query('select * from users where email = $1', [email]);

    if (!result) {
      return res.status(400).send({ error: 'User not found!' });
    }
    const [order] = await dbConnection.query(`select * from orders where id = $1`, [orderId]);
    const products = await dbConnection.query(`select p.*, op.product_qty, op.product_value from products p inner join order_products op on op.product_id = p.id and op.order_id = $1`, [orderId]);

    order['products'] = products || [];

    res.send({ order });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Get order and products failed' });
  }
});

module.exports = app => app.use('/order', router);