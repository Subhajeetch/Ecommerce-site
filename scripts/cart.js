export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
        {
          productId: '4Y1386A8EMS39SYBA05P',
          quantity: 1,
          deliveryOptionID: '1'
        },
        {
          productId: 'OJU1I737E0YVRXKPT09R',
          quantity: 2,
          deliveryOptionID: '3'
        }
        ];
};
  
  function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

export function updateCart(productId) {
  let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })
    
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionID: '1'
      });
    };
    
    saveToStorage();
};


export function removeFromCart (productId) {
  const newCart = [];
  
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    };
  });
  
  cart = newCart;
  saveToStorage();
};