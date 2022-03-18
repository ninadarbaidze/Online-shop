const express = require('express');

const cartController = require('../controllers/cart.controllers');

const router = express.Router();

router.post('/items', cartController.addCartItem) // /cart/items

router.get('/', cartController.getCart) // /cart/

router.patch('/items', cartController.updateCart); //for updating existing data, using patch because part of existing data is updated.



module.exports = router;
