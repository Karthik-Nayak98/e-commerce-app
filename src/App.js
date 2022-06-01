import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Spinner from './components/spinners/spinner'

import { auth } from './firebase/firebase.utils'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser } from './redux/slice/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getFirebaseItems, setFirebaseItems } from './redux/actions/cartActions'

import './App.css'
import { emptyCart, setTotalItems, setTotalPrice } from './redux/slice/cartSlice'

const Homepage = lazy(() => import('./pages/homepage/homepage'))
const Products = lazy(() => import('./pages/products/productspage'))
const Description = lazy(() => import('./pages/description/description'))
const SignIn = lazy(() => import('./pages/signin/signinpage'))
const SignUp = lazy(() => import('./pages/signup/signuppage'))
const Cart = lazy(() => import('./pages/cart/cartpage'))
const Navbar = lazy(() => import('./components/navbar/navbar.component'))
const Protected = lazy(() => import('./pages/routes/protected-routes'))

function App() {
  const dispatch = useDispatch()
  const { uid } = useSelector((state) => state.user)
  const { cartItems, totalItems, totalPrice } = useSelector((state) => state.cart)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          dispatch(setUser(user.uid))
          dispatch(getFirebaseItems(uid))
        } else {
          dispatch(setUser(null))
          dispatch(emptyCart([]))
          dispatch(setTotalItems(0))
          dispatch(setTotalPrice(0))
        }
      },
      []
    )
    return unsubscribe
  }, [dispatch, uid])

  useEffect(() => {
    dispatch(setFirebaseItems(cartItems, totalItems, totalPrice))
  }, [dispatch, cartItems, totalItems, totalPrice])

  return (
    <Suspense fallback={<Spinner />}>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route
            path='/cart'
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          />
          <Route path='mens' element={<Products />} />
          <Route path='womens' element={<Products />} />
          <Route path='jewelery' element={<Products />} />
          <Route path='electronics' element={<Products />} />
          <Route path='mens/:id' element={<Description />} />
          <Route path='womens/:id' element={<Description />} />
          <Route path='jewelery/:id' element={<Description />} />
          <Route path='electronics/:id' element={<Description />} />
        </Routes>
      </div>
    </Suspense>
  )
}

export default App
