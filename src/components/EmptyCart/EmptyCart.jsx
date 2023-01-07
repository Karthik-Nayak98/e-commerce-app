import PropTypes from 'prop-types';
import React from 'react';

import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Button } from '..';
import ShoppingCart from '../../assets/shopping-cart.png';

import './EmptyCart.css';

const EmptyCart = ({ heading, message }) => {
  return (
    <div className='empty-cart-container'>
      <img className='shopping-cart' src={ShoppingCart} alt='empty-cart' />
      <h2 className='empty__header'>{heading}</h2>
      <p className='empty-cart__text'>{message}</p>
      <Link to='/'>
        <Button classname='btn-shopnow' title='Shop Now'>
          <BsCart4 className='cart-icon' />
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;

EmptyCart.propTypes = {
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
