import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase/firebase.utils';
import { getFirebaseItems, setFirebaseItems } from './redux/actions/cartActions';
import { setUser } from './redux/slice/userSlice';

import {
  emptyCart,
  emptyWishlist,
  setTotalItems,
  setTotalPrice,
} from './redux/slice/cartSlice';

import './App.css';
import { Navbar, UserDetails } from './components';
import {
  Cart,
  Description,
  Error,
  Home,
  Login,
  Products,
  Protected,
  SignUp,
  Wishlist,
} from './pages';

import Mockman from 'mockman-js';

function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  const { wishlist, cartItems, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          dispatch(setUser(user.uid));
          dispatch(getFirebaseItems(uid));
        } else {
          dispatch(setUser(null));
          dispatch(emptyCart([]));
          dispatch(emptyWishlist([]));
          dispatch(setTotalItems(0));
          dispatch(setTotalPrice(0));
        }
      },
      []
    );
    return unsubscribe;
  }, [dispatch, uid]);

  useEffect(() => {
    dispatch(setFirebaseItems(cartItems, wishlist, totalItems, totalPrice));
  }, [dispatch, cartItems, totalItems, wishlist, totalPrice]);

  return (
    <>
      <Navbar />
      <UserDetails />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/cart'
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          />
          <Route
            path='/wishlist'
            element={
              <Protected>
                <Wishlist />
              </Protected>
            }
          />

          <Route path='category/:categoryId' element={<Products />} />
          <Route path='/product/:id' element={<Description />} />
          <Route path='/mockman' element={<Mockman />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
