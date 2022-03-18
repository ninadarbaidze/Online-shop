const Product = require('../models/product.model');

function getCart(req, res) {
    res.render('customer/cart/cart')
}

async function addCartItem(req, res, next) { //this function will be invoked by ajax post request to add to cart
    let product;
    try {

        //get product object
        product = await Product.findById(req.body.productId);
    } catch(error) {
        next(error);
        return;
    }

    //it's either emty array, or array with items from previous or existing sessions.
    const cart = res.locals.cart; //res.locals.cart =  cart = new Cart(sessionCart.items, sessionCart.totalQuantity,sessionCart.totalPrice );  

    //addItem method adds new cartItem into cart, or updating existing one, if the product's already there.
    cart.addItem(product);

    //creating and saving cart object in session. we'll check for it in cart.js middleware
    req.session.cart = cart;

    res.status(201).json({ //sending back to addToCart function from cart-management.
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity //cart = res.locals.cart = new Cart (cart.js) with all the totalPrice and totalQuantity values, so we're accessing it.
      });
}


function updateCart(req, res) { //this function will be invoked by ajax post request to update
    const cart = res.locals.cart;
    const updatedItemData = cart.updateItem(req.body.productId, +req.body.quantity);  //returns object { updatedItemPrice: cartItem.totalPrice }  
      
    req.session.cart = cart; //saving session

    res.json({
        message: 'Item updated!',
        updatedCartData: {
          newTotalQuantity: cart.totalQuantity,
          newTotalPrice: cart.totalPrice,
          updatedItemPrice: updatedItemData.updatedItemPrice,
        },
      });

}

module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCart: updateCart,
}