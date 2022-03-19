const express = require('express');

const ordersController = require('../controllers/order.controllers');

const router = express.Router();

router.post('/', ordersController.addOrder)  // /orders
router.get('/', ordersController.getOrders)  // /orders

router.get('/success', ordersController.getSuccess); //stripe success
router.get('/failure', ordersController.getFailure); //stripe failure


module.exports = router;
