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
        <button class="add_cart_btn">Add To Cart</button>
      </div>
    </div>
  `;
})

productsContainer.innerHTML = productsHTML;