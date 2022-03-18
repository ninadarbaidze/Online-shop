const path = require('path');
const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');
const createSessionConfig = require('./config/session'); 
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddlewares = require('./middlewares/error-handler');
const checkAuthStatMid = require('./middlewares/check-auth');
const protectRoutes = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const notFound = require('./middlewares/not-found');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');



const { urlencoded } = require('express');

const app = express(); //this is a app function where we're executing express function

app.set('view engine', 'ejs'); //telling express that we're using ejs for view engine.
app.set('views', path.join(__dirname, 'views')); //we're telling express where it can find views folder and the views in there should be handled by ejs.

app.use(express.static('public'));
app.use('/products/assets/', express.static('product-data')); //filter:only handle routes that starts with /products/assets/

app.use(express.urlencoded({extended: false})); //for parsing incoming requests. ability to use: req.body etc.
app.use(express.json()); //all incoming request is checking json data as well, json data will be given by fetch headers

const sessionConfig = createSessionConfig()
app.use(expressSession(sessionConfig))
//we're using this middlware after sessions, because it needs middleware.
app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatMid);


app.use(authRoutes); //app.use is a built in method for express, it allows us to add middlware that will be triggered in every incoming request.
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use(baseRoutes);
app.use('/orders', protectRoutes, ordersRoutes); //protect routes is middleware.
app.use('/admin', protectRoutes, adminRoutes); //first parameter acts like filter, so this route will start from /admin route.

app.use(notFound); //handling all request, that hasn't been handled except errors.

app.use(errorHandlerMiddlewares);

//if user can't access to the database then error is thrown, otherwise, it will start listening to the server.
db.connectToDatabase().then(
    app.listen(3000)
).catch(function(error) {
    console.log('Can\'t connect to the database');
    console.log(error)
})
