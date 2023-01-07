import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { BsBagCheck, BsHeartFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { IoBagHandle } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import { setShow } from '../../redux/slice/userSlice';

import './Navbar.css';

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState(0);

  const dispatch = useDispatch();
  const { cartItems, wishlist } = useSelector((state) => state.cart);
  const { uid, show } = useSelector((state) => state.user);

  useEffect(() => {
    const handleRezize = () => {
      setWidth(window.innerWidth);
      if (width > 600) setToggle(false);
    };
    window.addEventListener('resize', handleRezize);
    return () => {
      window.removeEventListener('resize', handleRezize);
    };
  }, [width]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleUser = () => {
    dispatch(setShow(!show));
  };

  return (
    <nav className='navbar'>
      <Link to='/'>
        <figure>
          <IoBagHandle color='#222' size='2rem' />
        </figure>
      </Link>
      <div
        role='button'
        tabIndex={0}
        className='hamburger'
        onClick={handleToggle}
        onKeyUp={handleToggle}>
        {!toggle ? (
          <GiHamburgerMenu color='#222' size='2rem' />
        ) : (
          <IoMdClose color='#222' size='1.5rem' />
        )}
      </div>
      <ul className={toggle ? 'navitems' : 'navitems active'}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/cart'>
            <BsBagCheck className='navicon' />
            {cartItems.length ? (
              <span className='cartlength'>{cartItems.length}</span>
            ) : null}
          </Link>
        </li>
        <li>
          <Link to='/wishlist'>
            <BsHeartFill className='navicon' />
            {wishlist.length ? (
              <span className='cartlength'>{wishlist.length}</span>
            ) : null}
          </Link>
        </li>
        {uid ? (
          <li className='username'>
            <FaUserCircle onClick={handleUser} className='user' />
          </li>
        ) : (
          <li>
            <Link to='/signin'>SignIn</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
