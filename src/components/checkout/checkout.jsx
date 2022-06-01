import React from 'react'
import PropTypes from 'prop-types'
import StripeCheckoutButton from '../stripe-checkout/stripe-checkout-button'

import './checkout.styles.css'

const Checkout = ({ totalPrice }) => {
  const price = Number(totalPrice).toFixed(2)
  const shippingPrice = 40
  const finalPrice = Number(price) + shippingPrice
  return (
    <div className='checkout__container'>
      <p className='checkout__title'>Order Summary</p>
      <div className='checkout-price__container'>
        <div className='subtotal'>
          <span>SubTotal</span>
          <span className='totalprice'>$ {price}</span>
        </div>
        <div className='shipping'>
          <span>Shipping</span>
          <span className='totalprice'>$ {shippingPrice}</span>
        </div>
      </div>
      <div className='grandtotal'>
        <span>Grand total</span>
        <span className='totalprice'>{finalPrice.toFixed(2)}</span>
      </div>
      <StripeCheckoutButton price={finalPrice.toFixed(2)} />
      <p className='card-note'>
        *Please use the following test card for payment.*
        <br />
        4242 4242 4242 4242 - Exp 02/42 - CVV 123
      </p>
    </div>
  )
}

export default Checkout

Checkout.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}
