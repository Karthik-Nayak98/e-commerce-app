import React from 'react';
import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';
import EmptyCart from '../../components/empty-cart/empty-cart';

import { MdDeleteForever } from 'react-icons/md';

import './cartpage.styles.css';
import Checkout from '../../components/checkout/checkout';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementTotalPrice,
  incrementItemCount,
  decrementItemCount,
  removeItem,
  incrementTotalPrice,
  decrementItem,
  incrementItem,
} from '../../redux/slice/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  function incrementCartProduct(event, product) {
    dispatch(incrementItemCount(1));
    dispatch(incrementItem(product));
    dispatch(incrementTotalPrice(product.price));
    toast.success('Item added to cart', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function decrementCartProduct(event, product) {
    dispatch(decrementItemCount(1));
    dispatch(decrementItem(product));
    dispatch(decrementTotalPrice(product.price));
    toast.error('Item removed from cart', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function removeCartItem(event, product) {
    const index = cartItems.findIndex((item) => item.id === product.id);
    dispatch(decrementItemCount(cartItems[index].quantity));
    dispatch(decrementTotalPrice(cartItems[index].totalPrice));
    dispatch(removeItem(product));
    toast.error('Item removed from cart', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return totalItems ? (
    <div>
      <Header header='CartItems' />
      <ToastContainer />
      <div className='cart__container'>
        <div className='cart-product__container'>
          <div className='cart-product__count'>
            Cart ({totalItems} {totalItems > 1 ? 'items' : 'item'})
          </div>
          {cartItems.map((item, index) => (
            <div key={item.id} className='cart__products'>
              <figure className='cart-product-image'>
                <img src={item.image} alt={item.title} />
              </figure>
              <div className='cart-product'>
                <p className='product-title' title={item.title}>
                  {item.title}
                </p>
                <div className='cart-product__counter'>
                  <Button
                    data-key={index}
                    onClick={(event) => decrementCartProduct(event, item)}
                    classname='btn-increment'
                    title='-'></Button>
                  <p>{item.quantity}</p>
                  <Button
                    data-key={`${index}`}
                    onClick={(event) => incrementCartProduct(event, item)}
                    classname='btn-increment'
                    title='+'></Button>
                </div>
                <div className='cart-product__price'>
                  <div className='product-price'>
                    ${item.totalPrice.toFixed(2)}
                  </div>
                  <Button
                    data-key={`${index}`}
                    onClick={(event) => removeCartItem(event, item)}
                    classname='btn-delete'
                    title='Remove Item'>
                    <MdDeleteForever
                      pointerEvents='none'
                      className='delete-icon'
                      size='1rem'
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Checkout totalPrice={totalPrice} />
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
}
