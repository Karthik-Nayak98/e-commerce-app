import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BsBagCheck } from 'react-icons/bs';
import { CartContext } from '../../context/cartContext';
import { AuthContext } from '../../context/authContext';
import { userSignOut } from '../../firebase/firebase-auth';

import Logo from '../../assets/shoppy.png';
import './navbar.styles.css';

function Navbar() {
  const { totalItems } = useContext(CartContext);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    userSignOut();
    navigate('/', { replace: true });
  };

  return (
    <nav className='navbar'>
      <figure>
        <img className='logo' src={Logo} alt='' />
      </figure>
      <ul className='navitems'>
        <li>
          <Link style={{ textDecoration: 'none' }} to='/'>
            Home
          </Link>
        </li>
        <li>
          {user ? (
            <Link
              style={{ textDecoration: 'none' }}
              to=''
              onClick={handleClick}>
              SignOut
            </Link>
          ) : (
            <Link style={{ textDecoration: 'none' }} to='/signin'>
              SignIn
            </Link>
          )}
        </li>
        <li>
          <Link to='/cart'>
            <BsBagCheck className='navicon' />
            {totalItems ? <span className='cartlength'>{totalItems}</span> : ''}
          </Link>
        </li>
        {user ? <li className='username'> {user.displayName[0]} </li> : null}
      </ul>
    </nav>
  );
}

export default Navbar;
