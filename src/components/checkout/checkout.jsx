import React from 'react'
import PropTypes from 'prop-types'
import StripeCheckoutButton from '../stripe-checkout/stripe-checkout-button'

import './checkout.styles.css'

const Checkout =({totalPrice}) => {
  const price = totalPrice.toFixed(2);
  const shippingPrice = 40;
  return (
    <div className='checkout__container'>
      <p className='checkout__title'>Order Summary</p>
      <div className='checkout-price__container'>
        <div className='subtotal'>
          <span>SubTotal</span>
          <span className='totalprice'>$ {totalPrice.toFixed(2)}</span>
        </div>
        <div className='shipping'>
          <span>Shipping</span>
          <span className='totalprice'>$ {shippingPrice}.00</span>
        </div>
      </div>
      <div className='grandtotal'>
        <span>Grand total</span>
        <span className='totalprice'>$ {Number(price) + shippingPrice}</span>
      </div>
      <StripeCheckoutButton price={totalPrice + shippingPrice}/>
      <p className='card-note'>*Please use the following test card for payment.*
        <br/>
        4242 4242 4242 4242 - Exp 02/42 - CVV 123
      </p>

    </div>
  )
}

export default Checkout

Checkout.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}
