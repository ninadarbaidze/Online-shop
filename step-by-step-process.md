# Online Shop Step by Step Process

## Create Authentification

1. install node, express, nodemon and create app.js file.    
2. create get() requests for signup and login, declairing functions in auth.controllers and export/importing it in auth.routes.  
3. install ejs package.  
4. create and fill forms, auth and base css files.  
5. create signup get and post requests.  
6. install mongodb and create data folder, with database.js file in it.  
7. created connection with mongodb in app.js.  
8. create user.model.js file in models.  
9. create class in user.model for user signup data. Purpose is to collect and set data and then save it using signup method.  
10. install bcryptjs for password hashing.  
11. use hashedPassword in class instead of this.password directly.  
12. after we created blueprint class for collecting and storing incoming user data in database, we can initialize it in auth.controllers. We create new object using new Users() and pass arguments in it. arguments will be req.body.email...   
13. after passing arguments, we're calling signUp() method to activate saving procedure via this method.  
14. add CSRF protection. install CSRF nodejs package Csurf. we should attach every NOT get method CSRF token.  
15. use this tokens in app and then in signup and signin.  
16  create error handler middleware in middlewares folder and handle 500 error.  
17. install express-session and connect-mongodb-session for session management.  
18. create config folder with session.js file to initialise session there.  
19. import session config in app and create middleware.  
20. manage login. in auth.model I added getUserWithSameEmail() method to User constructor, which searchs for the specific email in database.  


## In auth.controllers we create post method for login, where:

1. create new User object and pass only email and password arguments.   
2. call getUserWithSameEmail() method which searches for the specific entered email.  
3. if this email doesnot exists, I return and redirect to login page.  
4. if it passes, then I compare passwords, which is also method in constructor called comparePassword, where i compare bcrypt.compare(this.password, hashedPass), entered password to encrypt password.  
5. create util filder with authentification.js file, to manage sessions.  
6. i execute session function it auth.controllers, when every user info is right, i pass arguments to the function. third argument for action is an anonymous function, which will handle response.  
7. create products and base.js files in routes, to handle different kind of requests. when go to / url, we're redirected in /products, it's routes in products.js file. require them in app.js.  
8. create middleware file check-auth to create logic of checking if user is authenticated and then give access. authentification logic is necessery to give access to specific pages.  


    > user authentification scheme:
    user.model - add methods in class 1. find email in database which user entered. 2. compare entered pass with hashed pass. --> 
    authentification - get req.session.uid(user session id) and save session function. if the id exists, then isAuth is true. -->
    auth.controllers - check if email is right, check is pass is right. execute createSesion function from authentification with given user from arguments, in auth file this user's id will be checked. it will be redirected to /. -->
    header.ejs - there's a logic, if locals.isAuth is true (user is authentificated, then logout button will appear.)-->
    auth.routes - in auth routes, i create post router.method 



## Add logout functionality

1. when we're authenticated, we'll see logout button, in order for it to work, we should wrap this button in form and add POST method, because the intention is to change something in server. for security i'm adding CSRF token in that form(header.ejs) with hidden input.   
2. in authentication.js i create destroySession function where i indicate id = null.   
3. after that, i use that function in auth controllers pass req arguments and call that function.   
4. i write router.post method for logout in auth.routers.   

  
 
## Add data validation to signup

1. create validation.js in util and write logic, if fields aren't empty, etc.    
2. in auth.controllers i check if validation is false, i return.    
3. in the model i create new method and check if entered email already exists during registration.    
4. using that method in controllers and redirect.    


## Add text to signup errors

1. create session-flash.js in util and add 2 functions. 1: add error message and user input data to save in session. data will be saved temporarly, not to force users entered them again.   
2. we're doing the same for login procedures to show error of incorrect mail or pass.   
3. if sessionData is false, I pass empty strings to the object.   
4. in signup and login pages if inputData.errorMessage exists then i show error message in the beginning of the form. added inputData.email etc for the form input values.   


## Differenciate normal vs admin users, admins should be able to add or remove products.

1. in mongodb database, I added isAdmin property key to the user I want to be an admin. It's just a manual step.   
2. storing isAdmin property in session in with user id in authentification.js file.   
3. in check-auth, isAdmin global variable is added, most of the users it will be undefined, bcause they're not admins.   
4. in header.ejs manage what nav links admins and users should see.   


## Add admin pages and admin product pages

1. added admin.controllers.js file for controlling administration based requests. (getProducts, getNewProducts etc).   
2. create ejs all-product, new-product html files.   
3. adding image upload functionality.   
4. add node.js middleware for handling image upload called Multer.   
5. configure multer in image-upload.js.   
6. install uuid for unique identifiers, to name images unique names.  
7. create product.model.js in models file to configure datebase side code.   
8. inject newly created Product constructor into product.model post method to save new product data.   
9. create new static method in product.model.js for admin products. get all the data from database(they don't have url of products), map this array and return array elements objects as it's configured in object contructor., with the properties we want, creating new Product object inside that project method.   
10. all products data is looped injected in admin's page, but the images isn't served statically. to do this we should add new folder(product-data) statically besides "public" in app.js. also added '/products/assets/' filtering in app.js to look for urls/ start with that route.   
11. create update-product.ejs file for product detail page.  
12. handle update product page in admin.controller, working with :id unique id pages. writing get and post routes.  
13. create static method to find  product with that id.  
14. populate product-form for editing purposes, add new-product, default emty strings.  
15. create post request middleware.  
16. add imageRequired validation to the form, image is required if it's new-product, not required if it's updated product.  
17. update save() method for updating product situation, when there's no id in received object, we're saving normally, if there's an id we're updating existing product.  
18. add image preview functionality in front-end.  
    - created image-preview.js in public/scripts folder.   
    - create 'change' event and display preview after choosing image.  
19. delete products  
    - create remove() method in model and delete method in route, middleware function is created in admin.controllers. It doesn't work as it works with using post to delete. it need event listeners.   
    - create product-management.js in public scripts and get delete buttons, in these buttons we manually add dataset with  product id, save that id in event listener function.   
    - send delete requst to the server via fetch. this delete request is used to delete product from database. we're not attahing http body or headers to it only delete method.   
    - access parent element of that btn and remove it.   
    - basically after clicking delete button request is sent by fetch and that request is handled by backend. we're deleting it in backend and in html doc.
20. protect /admin routes from unauthorized requests.     
    - create protect-routes middleware and check if user isAuth redirect to 401 error page - user  lacks valid authentication credentials. and if user's not admin it redirects to 403 - forbidden, not authorized.  
    - we use that middleware in app.js right before we handle /admin pages routes.  



## Manage all products and product details page for regular users

1. rearrange product-item.ejs and insert it in customer all-product page.  
2. create product details page, create routes for it and use our model methods: findAllProducts and findById in product.controller.   


## Add to Cart functionality

1. Before add to cart process starts, cart.js middleware checks(via session) if that user already had cart, if no it stores res.locals.cart = new Cart() which is an emty array from cart.model. If there was a cart from previous session, I reinitialise existing cart from previous sessions, because methods that might attach objects are not stored in session. so we have res.locals.cart with an emty array or stuffed.  
2. **In cart.management:** 
   - When we click add to cart button, fetch post method is initialised and it's sending productId as body to the server via url "/cart/items". it's waiting response with the totalQuantity of cart items to update cart badge in dom.  
3. **In cart.routes:**
   - "/cart/items" post request is handled and middleware funtion addCartItem is passed, which is managed cart.controllers.  
4. **In cart.Controllers:**
   - I search for specific product via productId, which was sent via req.body using fetch.
   - using res.locals.cart(which is an emty or stuffed cart), we're envoking addItem() method from product.model, and passing product which we got from database.
   - addItem() checks if product we're trying to add already exists in the cart, then we updating existing cartItem and adding totalPrice and totalQuantity, if we're adding the product for the first time, we're just pushing cartItem to item array, also adding price and quantity to class instance.
   - then creating and saving cart object into the session. req.session.cart.item is an array of cartItem.
5. to populate cart page, we're sending get request and passing locals.cart.item to that page, with values.
   
   
## Update cart products - using fetch patch method, post is evoked after form submission, in form there's a one input and button.

1. **in item-cart-management:**
   - when product quantity changes and update button is clicked, updateCartItem is invoked, where we're sending patch request via fetch(), and sending body productId and quantity.
2. **in cart-controllers:**
   - handling router.patch routes (/cart/items) for submitting data. updateCart() is invoked from cart-controllers.
   - creating updatedItemData variable and storing cart.updateItem(req.body.productId, req.body.quantity, updateItem is from cart.model, where we're updating totalQuantity, totalPrice etc. updateItem also returns object - { updatedItemPrice: cartItem.totalPrice }, which is stored in updatedItemData. 
   - from cart.controllers, this json() response is sent back to fetch, which we'll use to update DOM.
         
         updatedCartData: {
          newTotalQuantity: cart.totalQuantity,
          newTotalPrice: cart.totalPrice,
          updatedItemPrice: updatedItemData.updatedItemPrice }
        
3. **updating DOM** - item.totalPrice and total products price should be updated. on is in cart-item.ejs, second cart.ejs. nav-items badge should also be updated. Using dom manipulation inf cart-item-management.js



## Create order logic  

1. prevent users who aren't login to buy products, logic is written in cart.ejs. Not showing button if user isn't logged in.
2. in order routes:
   - when user clicks "buy product", browser side post method and activates function is called.
3. in order.controllers:
   - addOrder function is called, where we find user by userId, and save order with 2 parameteres (cart, userId). Order Model need its. save method is Order class method.
4. in order.Model:
   - if the order dosen't exists, I create objectDocument and pass class instance properties, which was defined in order.controllers.
   - this objectDocument is inserted in database.


## Show users their orders.

1. **in order.routes:**
   - we're handling incoming requst for /orders, where we envoke getOrders function from order.controllers.
2. **in order.controller:**
   - we get all orders from specific user, this function(findAllForUser) is for regular users and render all-orders ejs where we populate the section. findAllForUser is Order class method, where we map all user orders.


## Order management - Admin side

1. When admin clicks "manage orders", get request will be sent to our server and browser will be provided by admin-orders.ejs page.
2. **in admin.controller** getOrders function is envoked which use Order class method findAll() and render admin-order with all the orders. Admin can change order status from pending, to fulfilled or cancelled.
3. **in order-management:**
   - admin-order page contains form, where she/he can change status of the order. To manage this, we're looping all the forms and create AJAX patch request for it using updateOrder().
   - updateOrder() is sending patch request to our backend  and sends newStatus(changed status) which we took from the form. when we get response from server with updated status, we're changing individual orders status badge.
4. **in admin.routes,** we get AJAX patch request and we're calling updateOrder() from admin.controllers.
5. **in admin.controllers:**
   - we take new status from AJAX req.body, create order variable and Order.findById method, which will get us specific order.
   - then we change order.status = newStatus //newStatus is the request body that we get.
   - call order.save(), save is Order class method, where we have specific if condition, it checks if order exists, it's just updating order.status, so user can also see updated status.


## Add payment method

1. Install stripe library.
2. Create a checkout session in order.controllers, where my online shop data is passed dynamically.
3. Create success and failure pages with specific routes to redirect after payment.



        

    
