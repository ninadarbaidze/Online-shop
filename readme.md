# A Basic Online Shop

This is a basic online shop with CRUD operations and various functionality noted below. 

### Demo:



https://user-images.githubusercontent.com/33086430/159115014-00fa29a5-8b2d-41a0-83af-718b695c2175.mp4




#### Shop development step by step process explained [here](https://github.com/ninadarbaidze/Online-shop/blob/main/step-by-step-process.md).


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
    - Buy product
- User type Validation
    - Registered or non registered users can’t have access to the administrator page.
    - Only registered users can place the order.
    - User authentication.

### Technologies used:

- Vanilla Javascript for front-end
- Node.js with express.js framework for back-end
- MongoDB for database management
- Design pattern - MVC
- Sending AJAX requests

### Packages:
- Live server - Nodemon
- Security - CSRF
- Templating engine - EJS
- Password hashing - Bcryptjs 
- Session management - express-session
- File uploading - Multer
- Unique identifiers generator - uuid



