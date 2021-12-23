import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaUserCircle} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'

import { BsBagCheck } from 'react-icons/bs';
import { CartContext } from '../../context/cartContext';
import { AuthContext } from '../../context/authContext';
import { userSignOut } from '../../firebase/firebase-auth';

import Logo from '../../assets/shoppy.png';
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


  const toggleNavbar = () => {
    setToggle(!toggle)
  };

  const handleClick = () => {
    userSignOut();
    navigate('/', { replace: true });
  };

  return (
    <nav className='navbar'>
      <figure>
        <img className='logo' src={Logo} alt='' />
      </figure>
      <div className='hamburger' onClick={toggleNavbar}>
       {!toggle ? <GiHamburgerMenu color='#222' size='1.5rem'/>:
       <IoMdClose color='#222' size='1.5rem'/>}
       
      </div>
       <ul className={toggle? 'navitems': 'navitems active'}>
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
          <Link to='/cart' style={{textDecoration:'none'}}>
            Cart {' '}
            <BsBagCheck className='navicon' />
            {totalItems ? <span className='cartlength'>{totalItems}</span> : ''}
          </Link>
        </li>
        {!user ? <li className='username'> 
       <FaUserCircle className='user'/>
        {/* {user.displayName[0]}  */}
        </li> : null}
      </ul>
    </nav>
  );
}

export default Navbar;
