import Homepage from './pages/homepage/homepage.component';
import Clothes from './pages/clothes/clothes.component';
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
          <Route path='mens' element={<Clothes />} />
          <Route path='womens' element={<Clothes />} />
          <Route path='jewelery' element={<Clothes />} />
          <Route path='electronics' element={<Clothes />} />
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
