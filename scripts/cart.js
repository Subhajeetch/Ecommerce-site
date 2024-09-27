export const cart = [
  {
    productId: '4Y1386A8EMS39SYBA05P',
    quantity: 1
  },
  {
    productId: 'OJU1I737E0YVRXKPT09R',
    quantity: 2
  },
  {
    productId: 'NFO4CB0QZWPQ8KZD8B4C',
    quantity: 7
  }
  ];

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
      quantity: 1
    });
    };
};