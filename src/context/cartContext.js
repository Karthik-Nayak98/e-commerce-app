import { createContext, useReducer, useState } from 'react';

// const initialState = {
//   cartItems: [],
//   totalItems: 0,
//   totalPrice: 0,
// };

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
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
