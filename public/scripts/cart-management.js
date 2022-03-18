const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

async function addToCart() {
    const productId = addToCartButtonElement.dataset.productid;
    const csrfToken = addToCartButtonElement.dataset.csrf;
    let response;

    try {
        response = await fetch('/cart/items', {
          method: 'POST',
          body: JSON.stringify({
            productId: productId,
            _csrf: csrfToken
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    } catch (error) {
        alert('Something went wrong!');
        return;
    }
      
      if (!response.ok) {
        alert('Something went wrong!');
        return;
      };

    //getting  message: 'Cart updated!' and newTotalItems: cart.totalQuantity  here.
    const responseData = await response.json();

    const newTotalQuantity = responseData.newTotalItems;

    for(let cartBadgeElement of cartBadgeElements) {
      //updating cart number based on totalItems in cart, which we got from cart.controller and cart.controller got it from res.locals.cart from cart.js
      cartBadgeElement.textContent = newTotalQuantity;
    }
}

addToCartButtonElement.addEventListener('click', addToCart)

