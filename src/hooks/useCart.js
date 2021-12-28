import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

export default function useCart() {
  const { cartItems, setCartItems, setTotalItems, setTotalPrice } =
    useContext(CartContext);

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
