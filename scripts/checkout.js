import {cart, removeFromCart} from './cart.js';
import {products} from './data.js';


let cartHTML = '';
cart.forEach((cartItems) => {
  const productId = cartItems.productId;
  let matchingItem;
  
  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  })
  
  cartHTML +=
  `
      <div class="cart_products_container js-cart-product-container-${matchingItem.id}">
        <div class="cart_product">
          <div class="product_image_price_quantity_dTime">
            <div class="product_image_container">
              <img src="${matchingItem.image}" alt="${matchingItem.name}" class="product_image">
            </div>
            <div class="product_other_details">
              <p class="product_name">${matchingItem.name}</p>
              
              <p class="product_detaiuls">Price: <span class="main_details">$${matchingItem.priceCents / 100}</span></p>
              
              <p class="product_detaiuls">Quantity: <span class="main_details">${cartItems.quantity}</span></p>
              
              <p class="Delivery_time"> Ariving on <span class="js_delevery_time">Octover 9, 2024</span></p>
              
            </div>
          </div>
          
          <div class="delivery_options_container">
            
            <div class="delivery_option">
              <div class="delivery_options_radio">
                <input type="radio" checked name="delevery_option_${matchingItem.id}" class="delivery_radio">
              </div>
              <div class="delivery_options_details">
                <p class="delevery_option_title">Free Delivery</p>
                <p class="delevery_option_sub_title">$0 Delivery charges</p>
              </div>
            </div>
            
            <div class="delivery_option">
              <div class="delivery_options_radio">
                <input type="radio" name="delevery_option_${matchingItem.id}">
              </div>
              <div class="delivery_options_details">
                <p class="delevery_option_title">Standard Delivery</p>
                <p class="delevery_option_sub_title">$4.99 Delivery charges</p>
              </div>
            </div>
            
            <div class="delivery_option">
              <div class="delivery_options_radio">
                <input type="radio" name="delevery_option_${matchingItem.id}">
              </div>
              <div class="delivery_options_details">
                <p class="delevery_option_title">Fast Delivery</p>
                <p class="delevery_option_sub_title">$8.99 Delivery charges</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="btns_container">
          <button class="delete_and_edit_btn js-delete-btn" data-product-id="${matchingItem.id}"><img class="essential_icons" src="images/logos_and_icons/delete.png" alt="Delete"></button>
          <button class="delete_and_edit_btn"><img class="essential_icons" src="images/logos_and_icons/edit.png" alt="Edit" /></button>
        </div>
        
      </div>
  `
});

document.querySelector('.cart_container').innerHTML = cartHTML;

function showCartQuantity() {
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    document.querySelector('.cart_item_count')
    .innerHTML = cartQuantity;
}; //updates the cart quantity on the header


document.querySelectorAll('.js-delete-btn')
  .forEach((button) => {
    button.addEventListener('click', () => {
    const productId = button.dataset.productId;
      removeFromCart(productId);
      showCartQuantity();
      
      
      const productContainer = document.querySelector(`.js-cart-product-container-${productId}`);
      productContainer.remove();
    });
  });
