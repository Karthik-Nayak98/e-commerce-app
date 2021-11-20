import React, { useEffect, useContext } from 'react';
import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';
import { CartContext } from '../../context/cartContext';

import { MdDeleteForever } from 'react-icons/md';
import { BsCart4 } from 'react-icons/bs';

import ShoppingCart from '../../assets/shopping-cart.jpg';
import './cartpage.styles.css';

export default function Cart() {
  const { cartItems, totalItems, totalPrice } = useContext(CartContext);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  return totalItems ? (
    <div>
      <Header header='CartItems' />
      <div className='cart__container'>
        <div className='cart-product__container'>
          <div className='cart-product__count'>
            Cart ({totalItems} {totalItems > 1 ? 'items' : 'item'})
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className='cart__products'>
              <figure className='cart-product-image'>
                <img src={item.image} alt={item.title} />
              </figure>
              <div className='cart-product'>
                <p className='product-title' title={item.title}>
                  {item.title}
                </p>
                <div className='cart-product__counter'>
                  <Button classname='btn-increment' title='-'></Button>
                  <p>{item.count}</p>
                  <Button classname='btn-increment' title='+'></Button>
                </div>
                <div className='cart-product__price'>
                  <Button
                    id={`${item.id}`}
                    classname='btn-delete'
                    title='Remove Item'>
                    <MdDeleteForever className='delete-icon' size='1.3rem' />
                  </Button>
                  <div className='product-price'>${item.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='checkout__container'>
          <p className='checkout__title'>Order Summary</p>
          <div className='checkout-price__container'>
            <div className='subtotal'>
              <span>SubTotal</span>
              <span className='totalprice'>$ {totalPrice}</span>
            </div>
            <div className='shipping'>
              <span>Shipping</span>
              <span className='totalprice'>$ 0</span>
            </div>
          </div>
          <div className='grandtotal'>
            <span>Grand total</span>
            <span className='totalprice'>$ {totalPrice}</span>
          </div>
          <Button classname='btn-checkout' title='go to checkout'></Button>
        </div>
      </div>
    </div>
  ) : (
    <div className='empty-cart-container'>
      <img className='shopping-cart' src={ShoppingCart} alt='empty-cart' />
      <p className='empty-cart__text'>
        There are no items in your shopping cart.
      </p>
      <Button classname='btn-shopnow' title='Shop Now'>
        <BsCart4 className='cart-icon' />
      </Button>
    </div>
  );
}
