# A Basic Online Shop

This is a basic online shop with CRUD operations, payment method and various functionality noted below. 

### Demo:




https://user-images.githubusercontent.com/33086430/159127868-c9b8218a-0c28-4001-bd1b-0a6647aa7233.mp4





#### Shop development step by step process explained [here](https://github.com/ninadarbaidze/Online-shop/blob/main/step-by-step-process.md).

### Technologies used:

- Vanilla Javascript for front-end
- Node.js with express.js framework for back-end
- MongoDB for database management
- Design pattern - MVC
- Payment method - Stripe
- Sending AJAX requests

### Packages:
- Live server - Nodemon
- Security - CSRF
- Templating engine - EJS
- Password hashing - Bcryptjs 
- Session management - express-session
- File uploading - Multer
- Unique identifiers generator - uuid


### Functionality:

- Registration, Login
    - Form validation
    - Flashing errors

**_Two type of users: admins and regular users_**

- Admins can:
    - Add products with images (image upload functionality and image preview)
    - Edit&Delete existing product
    - Manage orders - Change order status, which will be changed in regular user interface’s order page;
- Users can:
    - Add product to Cart
    - Change product quantity and update cart, cart is dynamic so everything will change accordingly due to user changes.
    - Buy products via stripe
- User type Validation
    - Registered or non registered users can’t have access to the administrator page.
    - Only registered users can place the order.
    - User authentication.



