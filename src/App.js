import React,{ lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';

import { CartContextProvider } from './context/cartContext';
import { AuthContextProvider } from './context/authContext';
import Spinner from './components/spinners/spinner';

import './App.css'

const Homepage = lazy(() => import('./pages/homepage/homepage'))
const Products = lazy(()=> import('./pages/products/productspage'))
const Description = lazy(() => import('./pages/description/description'))
const SignIn = lazy(() => import('./pages/signin/signinpage'))
const SignUp = lazy(() => import('./pages/signup/signuppage'))
const Cart = lazy(() => import('./pages/cart/cartpage'))
const Navbar = lazy(() => import('./components/navbar/navbar.component'))
const Protected = lazy(() => import('./pages/routes/protected-routes'))


function App() {
  return (
    <Suspense fallback={<Spinner/>}>
      <AuthContextProvider>
        <CartContextProvider>
          <Navbar />
          <div className='App'>
            <Routes>
              <Route path='/' element={<Homepage/>} />
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
              <Route path ='mens' element={<Products />} />
              <Route path ='womens' element={<Products />} />
              <Route path ='jewelery' element={<Products />} />
              <Route path ='electronics' element={<Products />} />
              <Route path ='mens/:id' element={<Description />} />
              <Route path ='womens/:id' element={<Description />} />
              <Route path ='jewelery/:id' element={<Description />} />
              <Route path ='electronics/:id' element={<Description />} />
            </Routes>
          </div>
        </CartContextProvider>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
