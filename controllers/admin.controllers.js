const Product = require('../models/product.model');
const Order = require('../models/order.model');


//showing admin page with existing products
async function getProducts(req, res, next) {
    try {
        const products = await Product.findAllProducts(); //from constructor static  method
        res.render('admin/products/all-products', {products: products});
    } catch(error) {
        next(error); //express doesn't see async error, so when we're passing it to next, it knows to handle the error, Express will catch and process them
        return;
    }
   
}


//showing add new product page
function getNewProducts(req, res) {
    res.render('admin/products/new-product')
}



//create new product
async function createProduct(req, res, next) {
    const product = new Product({
        ...req.body, //form fields
        image: req.file.filename // req.file is the name of the form field, filename - The name of the file within the destination
    });

    try {
        await product.save() //save product object

    } catch(error) {
        next(error);
        return;
    }

    res.redirect('/admin/products')
}


//get update-product page
async function getUpdateProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id)
        res.render('admin/products/update-product', {product: product})
    } catch(error) {
        next(error);
        return;
    };
}


//update existing product
async function postUpdateProduct(req, res) {
    const product = new Product({
        ...req.body,
        _id: req.params.id, //becomes this.id the mainc contructor object
         
    });

    //if the image exists/new image uploaded, during updating
    if(req.file) { 
        product.replaceImage(req.file.filename);
    }


    try {
        await product.save(); 
    } catch(error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
};


async function deleteProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id)
        await product.remove()
    } catch(error) {
        next(error);
        return;
    };

    res.json({message: 'deleted data!'});


}


async function getOrders(req, res, next) {
        try {
          const orders = await Order.findAll();
          res.render('admin/orders/admin-orders', {
            orders: orders
          });
        } catch (error) {
          next(error);
        }
      }
      
    
async function updateOrder(req, res, next) {
        const orderId = req.params.id;
        const newStatus = req.body.newStatus;
      
        try {
          const order = await Order.findById(orderId);
      
          order.status = newStatus;
      
          await order.save();
      
          res.json({ message: 'Order updated', newStatus: newStatus });
        } catch (error) {
          next(error);
        }

}



module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createProduct: createProduct,
    getUpdateProduct: getUpdateProduct,
    postUpdateProduct: postUpdateProduct,
    deleteProduct: deleteProduct,
    getOrders: getOrders,
    updateOrder: updateOrder,

}