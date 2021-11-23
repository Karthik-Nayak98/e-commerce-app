import { useContext, useEffect } from 'react';
import { CartContext } from '../context/cartContext';

export default function useCart() {
  const { cartItems, setCartItems, totalPrice, setTotalItems, setTotalPrice } =
    useContext(CartContext);

  useEffect(() => {
    console.log('cartItems', cartItems);
    console.log('totalprice', totalPrice);
  }, [cartItems, totalPrice]);

  function addItemsToCart(product) {
    let updatedCart;

    // Get the index of the item with the id of the product.
    const index = cartItems.findIndex((item) => item.id === product.id);

    //  Add new item to the array if the item is not present.
    if (index < 0) {
      const newCartItem = { ...product, count: 1, totalPrice: product.price };
      updatedCart = [...cartItems, newCartItem];
    } else {
      const prevCount = cartItems[index].count;
      const prevPrice = cartItems[index].price;
      updatedCart = [...cartItems];
      updatedCart[index] = {
        ...updatedCart[index],
        count: Number(prevCount) + 1,
        totalPrice: prevPrice + product.price,
      };
    }
    setCartItems(updatedCart);
    setTotalItems((prevCount) => prevCount + 1);
    setTotalPrice((prevPrice) => prevPrice + product.price);
  }
  return addItemsToCart;
}

// for (var i = 0; i < cartItems.length; ++i) {
//   if (cartItems[i].id === product.id) {
//     const prevCount = cartItems[i].count;
//     const prevPrice = cartItems[i].price;
//     const updatedCart = [...cartItems];
//     updatedCart[i] = {
//       ...updatedCart[i],
//       count: Number(prevCount) + 1,
//       totalPrice: prevPrice + product.price,
//     };
//     setTotalPrice((prevPrice) => prevPrice + product.price);
//     setCartItems(updatedCart);
//     break;
//   }
// }

// // If product is not present in the cart.
// if (i === cartItems.length) {
//   const newCartItem = { ...product, count: 1, totalPrice: product.price };
//   setCartItems([...cartItems, newCartItem]);
//   setTotalPrice((prevPrice) => prevPrice + product.price);
// }
