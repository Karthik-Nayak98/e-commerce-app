import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.utils';
import {
  incrementItemCount,
  incrementTotalPrice,
  setCart,
} from '../slice/cartSlice';

export const getFirebaseItems = (uid) => {
  return async (dispatch) => {
    const fetchData = async () => {
      let state = {};
      if (uid !== null) {
        const cartCollection = collection(db, 'usercart');
        const allDocuments = await getDocs(cartCollection);

        // Get the document of the particular user.
        const cart = allDocuments.docs.filter((doc) => doc.id === uid);
        state = cart[0].data();
      }
      return state;
    };
    try {
      if (uid !== null) {
        const data = await fetchData();
        dispatch(setCart(data.cartItems));
        dispatch(incrementItemCount(data.totalItems));
        dispatch(incrementTotalPrice(data.totalPrice));
      }
    } catch (err) {
      console.log('firebase error', err);
    }
  };
};

export const setFirebaseItems = (cartItems, totalItems, totalPrice, uid) => {
  return async (dispatch, getState) => {
    const uid = getState().user.uid;
    const putData = async () => {
      await setDoc(doc(db, 'usercart', uid), {
        cartItems: cartItems || [],
        totalItems: totalItems || 0,
        totalPrice: totalPrice || 0,
      });
    };
    try {
      if (uid) await putData();
    } catch (err) {
      console.log(err);
    }
  };
};
