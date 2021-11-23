import Homepage from './pages/homepage/homepage';
import Products from './pages/products/productspage';
import Navbar from './components/navbar/navbar.component';
import Description from './pages/description/description';
import Cart from './pages/cart/cartpage';

import { CartContextProvider } from './context/cartContext';
import { Route, Routes } from 'react-router-dom';

import './App.css';
function App() {
  return (
    <CartContextProvider>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='cart' element={<Cart />} />
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
    </CartContextProvider>
  );
}

export default App;
