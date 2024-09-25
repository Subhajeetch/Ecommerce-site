import {cart, updateCart} from './cart.js';
import {products} from './data.js';

const productsContainer = document.querySelector('.products_container');


let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
    <div class="product">
      <div class="product_img_and_price_container">
        <img src="${product.image}" alt="jujutsu_kaisan_t_shirt" class="product_img">
        <div class="price_container">
          <p class="price">USD $${product.priceCents / 100}</p>
        </div>
      </div>
      <div class="product_name_container">
        <p class="product_name">${product.name}</p>
      </div>
      <div class="add_cart_btn_container">
        <button class="add_cart_btn" data-product-id="${product.id}">Add To Cart</button>
      </div>
    </div>
  `;
});
productsContainer.innerHTML = productsHTML;

function showCartQuantity() {
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    
    document.querySelector('.cart_item_count')
    .innerHTML = cartQuantity;
};


document.querySelectorAll('.add_cart_btn')
.forEach((button) => {
  button.addEventListener('click', () => {
    const productId =  button.dataset.productId;
    
    updateCart(productId);
    showCartQuantity();
  });
});