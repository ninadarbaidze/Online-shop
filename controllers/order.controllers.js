const Order = require('../models/order.model');
const User = require('../models/user.model');
const stripe = require('stripe')('sk_test_51KezJpKyC0KropYQeUAfmZyr8i6XHO15EhW0lEdhNU14qx7Uem9DDWhLfvLPpFNoVYdWd9YmkbJFsy4anVmXNXGm00NZWlvAYZ');



//get all orders from specific user, this function is for regular users.
async function getOrders(req, res) {
    try {
      const orders = await Order.findAllForUser(res.locals.uid);
      res.render('customer/orders/all-orders', {
        orders: orders,
      });
    } catch (error) {
      next(error);
    }
  }



// post order  
async function addOrder(req, res, next) {
    const cart = res.locals.cart; // stores cart information (products with totalPrice and totalQuantity)
    let userDocument;
    try {
        userDocument = await User.findById(res.locals.uid); //findById is User class method, specifically created there for this purpose. res.locals.uid stores uid property key/value in user session, which equals to registered user's ObjectId from mongodb. 
    } catch (error) {
        return next(error);
    }
    
   
    const order = new Order(cart, userDocument)

    try {
        await order.save();
      } catch (error) {
        next(error);
        return;
      }
    
    //clear cart data before redirect. cart is reseting(badge number and products) 
    req.session.cart = null;


    //stripe configuration
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.items.map(function(item) {
      return  {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title
          },
          unit_amount: +item.product.price.toFixed(2) * 100
        },
        quantity: item.quantity,
      }
    }),
    mode: 'payment',
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });


    res.redirect(303, session.url);
      
    // res.redirect('/orders');  
}

function getSuccess(req, res) {
  res.render('customer/orders/success');
}

function getFailure(req, res) {
  res.render('customer/orders/failure');
}


 

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
    getSuccess: getSuccess,
    getFailure: getFailure
}