const Product = require('../models/product.model');
 
 
 async function getAllProducts(req, res, next) {

    try {
        const products = await Product.findAllProducts();
        res.render('customer/products/all-products', { products: products });

    } catch(error) {
        return next(error);
    };
  }


  async function getProductDetail(req, res, next) {

    try {
        const product = await Product.findById(req.params.id); 
        res.render('customer/products/product-details', { product: product  });

    } catch(error) {
        return next(error);
    };
      

  }


 module.exports = {
    getAllProducts: getAllProducts,
    getProductDetail: getProductDetail
     
 }     