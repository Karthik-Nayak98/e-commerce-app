import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import {
  decrementItemCount,
  decrementTotalPrice,
  emptyCart,
} from '../../redux/slice/cartSlice';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StripeCheckoutButton = ({ price }) => {
  const { totalItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const priceInCents = price * 100;

  const onToken = (token) => {
    dispatch(emptyCart([]));
    dispatch(decrementItemCount(totalItems));
    dispatch(decrementTotalPrice(totalPrice));
    toast.success('Order placed successfully', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <StripeCheckout
        label={`Pay Now ($${price})`}
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
