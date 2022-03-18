const Product = require('./product.model');

class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
      this.items = items;
      this.totalQuantity = totalQuantity;
      this.totalPrice = totalPrice;
    }
  
    addItem(product) {
      const cartItem = {
        product: product,
        quantity: 1,
        totalPrice: product.price,
      };
  
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];

        //if the product we're adding matches the product already in the cart
        if (item.product.id === product.id) {
          cartItem.quantity = +item.quantity + 1;
          cartItem.totalPrice = item.totalPrice + product.price;
          
          //replace existing item with updated item(cartItem), I'm overriding quantity and totalPrice.
          this.items[i] = cartItem;
  
          this.totalQuantity++;
          this.totalPrice += product.price;

          //I'm not pushing carItem in the item array again, I'm updating it, so I'll use return.
          return;
        }
      }
  
      this.items.push(cartItem);
      this.totalQuantity++;
      this.totalPrice += product.price;
    }


    async updatePrices() {
      const productIds = this.items.map(function (item) {
        return item.product.id;
      });
  
      const products = await Product.findMultiple(productIds);
  
      const deletableCartItemProductIds = [];
  
      for (const cartItem of this.items) {
        const product = products.find(function (prod) {
          return prod.id === cartItem.product.id;
        });
  
        if (!product) {
          // product was deleted!
          // "schedule" for removal from cart
          deletableCartItemProductIds.push(cartItem.product.id);
          continue;
        }
  
        // product was not deleted
        // set product data and total price to latest price from database
        cartItem.product = product;
        cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
      }
  
      if (deletableCartItemProductIds.length > 0) {
        this.items = this.items.filter(function (item) {
          return deletableCartItemProductIds.indexOf(item.product.id) < 0;
        });
      }
  
      // re-calculate cart totals
      this.totalQuantity = 0;
      this.totalPrice = 0;
  
      for (const item of this.items) {
        this.totalQuantity = this.totalQuantity + item.quantity;
        this.totalPrice = this.totalPrice + item.totalPrice;
      }
    }
    


    updateItem(productId, newQuantity) {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];

        if (item.product.id === productId && newQuantity > 0) {
          const cartItem = {...item}; //coping item object
          const changedQuantity = newQuantity - item.quantity; //difference between old and new quantity
          cartItem.quantity = newQuantity;
          cartItem.totalPrice = newQuantity * item.product.price; //calculating new totalPrice of that specific product
          this.items[i] = cartItem;
  
          this.totalQuantity += changedQuantity;
          this.totalPrice += changedQuantity * item.product.price;

          return { updatedItemPrice: cartItem.totalPrice };

        } else if(item.product.id === productId && newQuantity <= 0) {
            this.items.splice(i, 1);
            this.totalQuantity -= item.quantity;
            this.totalPrice -= item.totalPrice;
            return { updatedItemPrice: 0 }
        }
      } 

       
    }

  }

  
  module.exports = Cart;