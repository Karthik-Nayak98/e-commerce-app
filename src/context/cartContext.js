import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCart = {
    cartItems,
    setCartItems,
    totalItems,
    setTotalItems,
    totalPrice,
    setTotalPrice,
  };

  return (
    <CartContext.Provider value={getCart}>
      {props.children}
      {/* <App /> */}
    </CartContext.Provider>
  );
};
