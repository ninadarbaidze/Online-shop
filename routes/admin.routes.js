const express = require('express');

const router = express.Router();

const adminControllers = require('../controllers/admin.controllers'); 
const multerMiddleware = require('../middlewares/image-upload');

// /admin/products is the original url, we're filtering this url in app.js
router.get('/products', adminControllers.getProducts);


router.get('/products/new', adminControllers.getNewProducts);

//post new products, when admin adds it
router.post('/products', multerMiddleware, adminControllers.createProduct); //during post, we can add multerMiddleware and express will execute it.


//get individual page of product update
router.get('/products/:id', adminControllers.getUpdateProduct)

//post that individual page
router.post('/products/:id', multerMiddleware, adminControllers.postUpdateProduct)

//delete product
router.delete('/products/:id',  adminControllers.deleteProduct)

//get all orders in admin page.
router.get('/orders', adminControllers.getOrders);

//change some data(order status ) in order using patch
router.patch('/orders/:id', adminControllers.updateOrder);


module.exports = router;