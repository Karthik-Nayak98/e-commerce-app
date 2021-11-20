import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { BsBagCheck } from 'react-icons/bs';
import { CartContext } from '../../context/cartContext';

import Logo from '../../assets/shoppy.png';
import './navbar.styles.css';

function Navbar() {
  const { totalItems } = useContext(CartContext);
  return (
    <nav className='navbar'>
      <figure>
        <img className='logo' src={Logo} alt='' />
      </figure>
      <ul className='navitems'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>Sign-out</li>
        <li>
          <Link to='cart'>
            <BsBagCheck className='navicon' />
            {totalItems ? <span className='cartlength'>{totalItems}</span> : ''}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
