import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {GiHamburgerMenu} from 'react-icons/gi'
import {FaUserCircle} from 'react-icons/fa'
import {IoMdClose } from 'react-icons/io'
import {IoBagHandle} from 'react-icons/io5'
import { BsBagCheck } from 'react-icons/bs';

import { CartContext } from '../../context/cartContext';
import { AuthContext } from '../../context/authContext';
import { userSignOut } from '../../firebase/firebase-auth';

import './navbar.styles.css';

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState(0);

  const { totalItems } = useContext(CartContext);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=> {
    const handleRezize = ()=>{
      setWidth(window.innerWidth)
      if(width > 600)
        setToggle(false)
    }
    window.addEventListener('resize',handleRezize)
    return ()=> {
      window.removeEventListener('resize', handleRezize)
    }
  },[width])


  const handleToggle = () => {
    setToggle(!toggle)
  };

  const handleClick = () => {
    userSignOut();
    navigate('/', { replace: true });
  };

  return (
    <nav className='navbar'>
      <Link to='/'>
        <figure>
          <IoBagHandle color='#222' size='1.8rem'/>
        </figure>
      </Link>
      <div role='button' tabIndex={0} className='hamburger' onClick={handleToggle} onKeyUp={handleToggle}>
        {!toggle ? 
          <GiHamburgerMenu color='#222' size='1.5rem'/>:
          <IoMdClose color='#222' size='1.5rem'/>}
      </div>
      <ul className={toggle? 'navitems': 'navitems active'}>
        <li>
          <Link to='/'>
            Home
          </Link>
        </li>
        <li>
          {user ? (
            <Link
              to=''
              onClick={handleClick}>
              SignOut
            </Link>
          ) : (
            <Link to='/signin'>
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
        {user ? 
          <li className='username'>
            <FaUserCircle className='user'/>
          </li> : null}
      </ul>
    </nav>
  );
}

export default Navbar;
