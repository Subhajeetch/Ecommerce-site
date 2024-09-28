import {cart} from '../cart.js';
import {getProduct} from '../data.js';
import {getDeliveryOption} from '../deliveryOptions.js';


export function renderPaymentSummary() {
  let totalCartQuantity = 0;
  let allProductPriceCents = 0;
  let allShippingPriceCents = 0;
  
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    allProductPriceCents += product.priceCents * cartItem.quantity;
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionID);
    allShippingPriceCents += deliveryOption.priceCents;
    
    totalCartQuantity += cartItem.quantity;
  });
  
  const totalBeforeTaxCents = allProductPriceCents + allShippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  
  
  const paymentSummaryHTML = `
  
      <p class="summary_tilte">Order Summary</p>
        <div class="summary">
          <div class="summary_details_container">
            <div class="items_and_shipping_subtitles">
              <p class="summury_subtitles">Items (${totalCartQuantity}):</p>
              <p class="summury_subtitles">Shipping & handling:</p>
            </div>
            <div class="items_and_shipping_prices to_make_border">
              <p class="summary_prices">$${(Math.round(allProductPriceCents) / 100).toFixed(2)}</p>
              <p class="summary_prices">$${(Math.round(allShippingPriceCents) / 100).toFixed(2)}</p>
            </div>
          </div>
          <div class="summary_details_container">
            <div class="items_and_shipping_subtitles">
              <p class="summury_subtitles">Total before tax:</p>
              <p class="summury_subtitles">Estimated tax (10%):</p>
            </div>
            <div class="items_and_shipping_prices">
              <p class="summary_prices">$${(Math.round(totalBeforeTaxCents) / 100).toFixed(2)}</p>
              <p class="summary_prices">$${(Math.round(taxCents) / 100).toFixed(2)}</p>
            </div>
          </div>
      </div>
      
      <div class="summary_total_and_checkout_btn_container">
        <div class="total_price_container">
           <p class="order_total">Order total:</p>
           <p class="total_price">$${(Math.round(totalCents) / 100).toFixed(2)}</p>
        </div>
        <div class="checkout_btn_container">
          <button class="checkout_btn">Place your order</button>
        </div>
      </div>
  
  `;
  
  const summaryContainerHTML = document.querySelector('.js_summury_container');
  
  if (totalCartQuantity === 0) {
    summaryContainerHTML.innerHTML = 
   `
    <p class="cart_empty_para">Your cart is empty!</p>
    <div class="broke_img_container">
      <img src="images/others/broke_af.gif" alt="no_money" class="broke_img">
    </div>
    <button class="buy_something_btn" onclick="window.location.href = 'index.html';">Let's Buy Something</button>
   
   `
  } else {
    summaryContainerHTML.innerHTML = paymentSummaryHTML;
  };
};