import { useContext, useEffect } from 'react';
import { CartContext } from '../context/cartContext';

export default function useCart() {
  const { cartItems, setCartItems, setTotalItems, setTotalPrice } =
    useContext(CartContext);

  useEffect(() => {
    console.log('cartItems', cartItems);
  }, [cartItems]);

  function addItemsToCart(product) {
    // const updatedCart = cartItems.map((item, index) => {
    //   count = index + 1;
    //   if (item.id === product.id) {
    //     const prevCount = item.count;
    //     const updatedCart = [...cartItems];
    //     updatedCart[index] = { ...item, count: prevCount + 1 };
    //     console.log(`before count update ${Object.values(updatedCart)}`);
    //     return updatedCart;
    //   } else {
    //   }
    // });

    for (var i = 0; i < cartItems.length; ++i) {
      if (cartItems[i].id === product.id) {
        const prevCount = cartItems[i].count;
        console.log(typeof prevCount);
        const updatedCart = [...cartItems];
        updatedCart[i] = { ...updatedCart[i], count: Number(prevCount) + 1 };
        setTotalPrice((prevPrice) => prevPrice + product.price);
        setCartItems(updatedCart);
        break;
      }
    }

    // If product is not present in the cart.
    if (i === cartItems.length) {
      const newCartItem = { ...product, count: 1 };
      setCartItems([...cartItems, newCartItem]);
      setTotalPrice((prevPrice) => prevPrice + product.price);
    }
    setTotalItems((prevCount) => prevCount + 1);
  }
  // function addItemsToCart(item) {
  //   const keys = Object.keys(cartItems);
  //   for (var i = 0; i < keys.length; ++i) {
  //     if (Number(keys[i]) === item.id) {
  //       let { count, price } = cartItems[keys[i]];
  //       const updatedItem = { ...cartItems[keys[i]], count: count + 1 };
  //       setCartItems({ ...cartItems, [item.id]: updatedItem });
  //       setTotalPrice((prevPrice) => prevPrice + price);
  //       break;
  //     }
  //   }

  //   //If the product is not present in the cart.
  //   if (i === keys.length) {
  //     const product = { [item.id]: { ...item, count: 1 } };

  //     setCartItems((prevState) => ({
  //       ...prevState,
  //       ...product,
  //     }));

  //     setTotalPrice((prevPrice) => prevPrice + product[item.id].price);
  //   }
  //   setTotalItems((prevCount) => prevCount + 1);
  // }
  return addItemsToCart;
}
