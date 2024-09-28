import {cart, removeFromCart, updateDeliveryOption} from './cart.js';
import {products} from './data.js';
import {deliveryOptions} from './deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


let cartHTML = '';
cart.forEach((cartItems) => {
  const productId = cartItems.productId;
  let matchingItem;
  
  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    };
  });
  
  const deliveryOptionId = cartItems.deliveryOptionID;
  
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    };
  });
  
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays, 'days'
  );
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  
  
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
              
              <p class="Delivery_time"> Ariving on <span class="js_delevery_time">${dateString}</span></p>
              
            </div>
          </div>
          <div class="delivery_options_container">
            ${deliveryOptionHTML(matchingItem, cartItems)}
          </div>
        </div>
        
        <div class="btns_container">
          <button class="delete_and_edit_btn js-delete-btn" data-product-id="${matchingItem.id}"><img class="essential_icons" src="images/logos_and_icons/delete.png" alt="Delete"></button>
          <button class="delete_and_edit_btn"><img class="essential_icons" src="images/logos_and_icons/edit.png" alt="Edit"></button>
        </div>
        
      </div>
  `;
});

function deliveryOptionHTML(matchingItem, cartItems) {
  let html = '';
  
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
        );
        
        const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${(deliveryOption.priceCents / 100).toFixed(2)} -`;
        
        const isChecked = deliveryOption.id === cartItems.deliveryOptionID;
        
        
    html +=
    `
    <div class="delivery_option js_delevery_option"
    data-product-id="${matchingItem.id}"
    data-delivery-option-id="${deliveryOption.id}">
      <div class="delivery_options_radio">
        <input type="radio" ${isChecked ? 'checked' : ''} name="delevery_option_${matchingItem.id}" class="delivery_radio">
      </div>
      <div class="delivery_options_details">
        <p class="delevery_option_title">${dateString}</p>
        <p class="delevery_option_sub_title">${priceString} Shipping</p>
      </div>
    </div>
`;
  });
  
  return html;
};


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
  
  document.querySelectorAll('.js_delevery_option')
    .forEach((deliveryOptionButton) => {
      deliveryOptionButton.addEventListener('click', () => {
        const {productId, deliveryOptionId} = deliveryOptionButton.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
      });
    });