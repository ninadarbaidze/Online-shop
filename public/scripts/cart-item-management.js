const updateItemForm = document.querySelectorAll('.cart-item-management');


async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target; //form that was submitted

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch('/cart/items', {
      method: 'PATCH',
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }
  const responseData = await response.json();

  //if cart item quantity input is 0
  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove(); //remove cart item list.
  } else {
      //get span element from cart-item.ejs where we store item.totalPrice and change it's value
      const cartItemTotalPrice = form.parentElement.querySelector('.cart-item-price')
      cartItemTotalPrice.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);

  }

  //get and update cart total price
  const cartTotalPrice = document.getElementById('cart-total-price');
  cartTotalPrice.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

  //get and update cart badge
  const cartBadges =  document.querySelectorAll('.nav-items .badge');

  for(let cartBadge of cartBadges) {
    cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
  }
}




for(let formElem of updateItemForm) {
  formElem.addEventListener('submit', updateCartItem)
}