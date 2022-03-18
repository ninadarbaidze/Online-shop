const Cart = require('../models/cart.model');

//this function's job is to look at incoming request to identify if user have a cart, or doesn't
function initializeCart(req, res, next) {
    let cart;

    //If in request session, cart property is undefined, so user doesn't have a cart
    if(!req.session.cart) {   
        cart = new Cart() //we have default values for it, empty array with 0 total price and 0 total quantity.
    } else {

        //storing request session cart object
        const sessionCart = req.session.cart; 
        //reinitialise existing cart from previous sessions, because methods that might attach objects are not stored in session.
        cart = new Cart(
          sessionCart.items,
          sessionCart.totalQuantity,
          sessionCart.totalPrice
        );  
    }
    
     //global variable cart = newly created or existing cart
    res.locals.cart = cart;

    next() 
}

module.exports = initializeCart;