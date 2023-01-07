import React from 'react';

import { MdDeleteForever } from 'react-icons/md';
import { Button, Checkout, EmptyCart, Header } from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '../../hooks/useToast';
import {
  decrementItem,
  decrementItemCount,
  decrementTotalPrice,
  incrementItem,
  incrementItemCount,
  incrementTotalPrice,
  removeItem,
} from '../../redux/slice/cartSlice';
import './cartpage.styles.css';

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalItems, totalPrice } = useSelector((state) => state.cart);
  const { successToast, errorToast } = useToast();

  function incrementCartProduct(event, product) {
    dispatch(incrementItemCount(1));
    dispatch(incrementItem(product));
    dispatch(incrementTotalPrice(product.price));
    successToast('Item added to cart');
  }

  function decrementCartProduct(event, product) {
    dispatch(decrementItemCount(1));
    dispatch(decrementItem(product));
    dispatch(decrementTotalPrice(product.price));
    errorToast('Item removed from cart');
  }

  function removeCartItem(event, product) {
    const index = cartItems.findIndex((item) => item.id === product.id);
    dispatch(decrementItemCount(cartItems[index].quantity));
    dispatch(decrementTotalPrice(cartItems[index].totalPrice));
    dispatch(removeItem(product));
    errorToast('Item deleted from cart');
  }

  return totalItems ? (
    <>
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
                  <div className='product-price'>₹{item.totalPrice.toFixed(2)}</div>
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
    </>
  ) : (
    <EmptyCart
      heading='Your cart is empty!!'
      message='Looks like you have not added anything to your cart yet.'
    />
  );
}
