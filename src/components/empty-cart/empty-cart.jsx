import React from 'react'

import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';

import Button from '../../components/button/button.component';
import ShoppingCart from '../../assets/shopping-cart.png';

import './empty-cart.styles.css'

const EmptyCart = ()=> {
    return (
    <div className='empty-cart-container'>
      <img className='shopping-cart' src={ShoppingCart} alt='empty-cart' />
      <p className='empty-cart__text'>
        There are no items in your shopping cart.
      </p>
      <Link to='/'>
        <Button classname='btn-shopnow' title='Shop Now'>
          <BsCart4 className='cart-icon' />
        </Button>
      </Link>
    </div>
    )
}

export default EmptyCart