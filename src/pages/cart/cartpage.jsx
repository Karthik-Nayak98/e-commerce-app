import React, { useContext } from 'react';
import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';
import EmptyCart from '../../components/empty-cart/empty-cart';

import { CartContext } from '../../context/cartContext';

import { MdDeleteForever } from 'react-icons/md';

import './cartpage.styles.css';
import Checkout from '../../components/checkout/checkout';

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
                    data-key={index}
                    onClick={decrementCartProduct}
                    classname='btn-increment'
                    title='-'></Button>
                  <p>{item.count}</p>
                  <Button
                    data-key={`${index}`}
                    onClick={incrementCartProduct}
                    classname='btn-increment'
                    title='+'></Button>
                </div>
                <div className='cart-product__price'>
                  <div className='product-price'>${item.price}</div>
                  <Button
                    data-key={`${index}`}
                    onClick={removeItem}
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
        <Checkout totalPrice={totalPrice}/>
      </div>
    </div>
  ) : <EmptyCart/>
 
}
