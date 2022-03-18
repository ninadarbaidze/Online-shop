const Order = require('../models/order.model');
const User = require('../models/user.model');




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
      
    res.redirect('/orders');  
}
 

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
}