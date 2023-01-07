import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '../../hooks/useToast';
import {
  decrementItemCount,
  decrementTotalPrice,
  emptyCart,
} from '../../redux/slice/cartSlice';

const StripeCheckoutButton = ({ price }) => {
  const { totalItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { successToast } = useToast();
  const priceInCents = price * 100;

  const onToken = () => {
    dispatch(emptyCart([]));
    dispatch(decrementItemCount(totalItems));
    dispatch(decrementTotalPrice(totalPrice));
    successToast('Order placed successfully');
  };

  return (
    <>
      <StripeCheckout
        label={`Pay Now (₹${price})`}
        name='Shoppy'
        shippingAddress
        image='https://i.imgur.com/OtfIonj.png'
        description='Shopping with style'
        amount={priceInCents}
        token={onToken}
        stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
      />
      <ToastContainer />
    </>
  );
};

export default StripeCheckoutButton;

StripeCheckoutButton.propTypes = {
  price: PropTypes.number.isRequired,
};
