import PropTypes from 'prop-types';
import React from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import StripeCheckoutButton from '../StripeCheckoutButton/StripeCheckoutButton';

import './Checkout.css';

const Checkout = ({ totalPrice }) => {
  const price = Number(totalPrice).toFixed(2);
  const shippingPrice = 40;
  const finalPrice = Number(price) + shippingPrice;
  return (
    <div className='checkout__container'>
      <div className='card-note'>
        <p>
          <AiFillInfoCircle className='icon' size='1rem' />
          This payment page is for demonstration purpose, Please use the following
          test card for payment.
          <br />
          4242 4242 4242 4242 - Exp 02/42 - CVV 123
        </p>
      </div>
      <p className='checkout__title'>Order Summary</p>
      <div className='checkout-price__container'>
        <div className='subtotal'>
          <span>SubTotal</span>
          <span className='totalprice'>₹ {price}</span>
        </div>
        <div className='shipping'>
          <span>Shipping</span>
          <span className='totalprice'>₹ {shippingPrice}</span>
        </div>
      </div>
      <div className='grandtotal'>
        <span>Grand total</span>
        <span className='totalprice'>₹ {Number(finalPrice.toFixed(2))}</span>
      </div>
      <StripeCheckoutButton price={Number(finalPrice.toFixed(2))} />
    </div>
  );
};

export default Checkout;

Checkout.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};
