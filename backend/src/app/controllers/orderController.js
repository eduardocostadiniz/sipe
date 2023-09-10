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

    const data = await auth0Service.getAdminToken()
    const accessToken = data['access_token']

    const [auth0User] = await auth0Service.getUserByEmail(accessToken, email);
    const userMetadata = auth0User.user_metadata || {}
    const profile = userMetadata.sipe && userMetadata.sipe.perfil || ''
    const allowedClients = (userMetadata.sipe && userMetadata.sipe.cnpj || '').split(',')
    let orders = []

    if (profile === UserProfile.ADMIN) {
      orders = await dbConnection.query('select * from orders');
    } else {
      console.log(`\nAllowed to ${allowedClients}`);
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