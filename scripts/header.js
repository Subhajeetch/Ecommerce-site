import {cart} from './cart.js';

let cartQuantity = 0;
  cart.forEach((cartItem) => {
     cartQuantity += cartItem.quantity;
  });
    
const headerData = `
  <div class="logo_div">
    <img src="images/logos_and_icons/logo.png" alt="Mantomart" class="logo"/>
  </div>
  <div class="search_bar">
    <div class="input_search_cont">
      <input type="text" placeholder="Search Products" class="input_search">
    </div>
    <button class="search_btn"><img src="images/logos_and_icons/search_icon.png" alt="search" class="search_icon"></button>
  </div>
  <div class="buttons">
    <div class="orders">
      <img src="images/logos_and_icons/orders_icon.png" alt="orders" class="orders_icon"/>
    </div>
    <div class="cart">
      <img src="images/logos_and_icons/cart_icon.png" alt="cart" class="cart_icon">
      <div class="cart_item_count_container">
        <p class="cart_item_count">${cartQuantity}</p>
      </div>
    </div>
  </div>
`;

const header = document.querySelector('.header');
header.innerHTML = headerData;


const cartButton = document.querySelector('.cart');
cartButton.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

const logoButton = document.querySelector('.logo_div');
logoButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});