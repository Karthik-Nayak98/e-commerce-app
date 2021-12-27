import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './authContext';
import { getCollection } from '../firebase/firebase-firestore'
import { getDocs,setDoc,doc } from 'firebase/firestore'
import {db} from '../firebase/firebase.utils'

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
  const user = useContext(AuthContext)

  useEffect(() => {
   const getDocuments = async () => {
      if(user !== null){
        const collection = getCollection()
        const allDocuments = await getDocs(collection)
        
        // Get the document of the particular user.
        const cart = allDocuments.docs.filter(doc => doc.id === user.uid);
       
        const state = cart[0].data()

        setCartItems(state.cartItems)
        setTotalItems(state.totalItems)
        setTotalPrice(state.totalPrice)
      }
    }
    getDocuments()
  },[user])

  useEffect(() => {
   const getDocuments = async () => {
      if(user !== null){
        await setDoc(doc(db, "usercart", user.uid), {
          cartItems: cartItems,
          totalItems: totalItems,
          totalPrice: totalPrice
        });
      }
    }
    getDocuments()
  },[user, cartItems, totalItems, totalPrice])

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
    </CartContext.Provider>
  );
};
