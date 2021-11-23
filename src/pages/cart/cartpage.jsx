import React, { useContext } from 'react';
import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';

import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';

import { MdDeleteForever } from 'react-icons/md';
import { BsCart4 } from 'react-icons/bs';

import ShoppingCart from '../../assets/shopping-cart.jpg';
import './cartpage.styles.css';

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    totalItems,
    setTotalItems,
    setTotalPrice,
    totalPrice,
  } = useContext(CartContext);

  function incrementCartProduct(event) {
    const index = event.target.dataset.key;
    const prevCount = cartItems[index].count;
    const prevPrice = cartItems[index].price;
    const totalPrice = cartItems[index].price;
    const updatedCart = [...cartItems];
    updatedCart[index] = {
      ...updatedCart[index],
      count: Number(prevCount) + 1,
      totalPrice: Number(totalPrice) + prevPrice,
    };
    setTotalItems((prevCount) => prevCount + 1);
    setTotalPrice((price) => price + prevPrice);
    setCartItems(updatedCart);
  }

  function decrementCartProduct(event) {
    const index = event.target.dataset.key;
    const prevCount = cartItems[index].count;
    const prevPrice = cartItems[index].price;
    const totalPrice = cartItems[index].price;
    const updatedCart = [...cartItems];
    if (Number(prevCount) === 1) {
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index] = {
        ...updatedCart[index],
        count: Number(prevCount) - 1,
        totalPrice: Number(totalPrice) - prevPrice,
      };
    }
    setTotalItems((prevCount) => prevCount - 1);
    setTotalPrice((price) => price - prevPrice);
    setCartItems(updatedCart);
  }

  function removeItem(event) {
    const index = event.target.dataset.key;
    const count = cartItems[index].count;
    const price = cartItems[index].price;
    const updatedCart = [...cartItems];

    updatedCart.splice(index, 1);

    setTotalItems((prevCount) => prevCount - count);
    setTotalPrice((prevPrice) => prevPrice - price * count);
    setCartItems(updatedCart);
  }

  return totalItems ? (
    <div>
      <Header header='CartItems' />
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
                    id={index}
                    handleClick={decrementCartProduct}
                    classname='btn-increment'
                    title='-'></Button>
                  <p>{item.count}</p>
                  <Button
                    id={`${index}`}
                    handleClick={incrementCartProduct}
                    classname='btn-increment'
                    title='+'></Button>
                </div>
                <div className='cart-product__price'>
                  <Button
                    id={`${index}`}
                    handleClick={removeItem}
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
              <span className='totalprice'>$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className='shipping'>
              <span>Shipping</span>
              <span className='totalprice'>$ 0</span>
            </div>
          </div>
          <div className='grandtotal'>
            <span>Grand total</span>
            <span className='totalprice'>$ {totalPrice.toFixed(2)}</span>
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
      <Link path='/'>
        <Button classname='btn-shopnow' title='Shop Now'>
          <BsCart4 className='cart-icon' />
        </Button>
      </Link>
    </div>
  );
}
