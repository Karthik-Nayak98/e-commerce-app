import { Route, Routes } from 'react-router-dom';

import Homepage from './pages/homepage/homepage';
import Products from './pages/products/productspage';
import Navbar from './components/navbar/navbar.component';
import Description from './pages/description/description';
import SignIn from './pages/signin/signinpage';
import SignUp from './pages/signup/signuppage';
import Cart from './pages/cart/cartpage';
import Protected from './pages/routes/protected-routes';

import { CartContextProvider } from './context/cartContext';
import { AuthContextProvider } from './context/authContext';

import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
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
  );
}

export default App;
