import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { ALL_PRODUCTS, MENS_CATEGORY_API } from '../../constants/apiurl';

import useCart from '../../hooks/useCart.js';
import useProducts from '../../hooks/useProducts';

import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';

import './clothes.styles.css';

function Clothes() {
  const params = useLocation();
  const route = params.pathname.split('/')[1];
  const productList = useProducts(route);
  const addItemstoCart = useCart();

  function handleClick(event) {
    const id = event.target.dataset.key;
    const clickedProduct = productList.filter((product) => {
      if (product.id == id) return product;
    });

    const product = clickedProduct[0];
    addItemstoCart(product);
  }

  return (
    <div>
      <Header header={`${route.toUpperCase()} CATEGORY`} />
      <div className='product-container'>
        {productList.map((item) => (
          <div key={item.id} className='products'>
            <div className='product'>
              <Link to={`/${route}/${item.id}`}>
                <figure className='product-image'>
                  <img src={item.image} alt={item.title} />
                </figure>
              </Link>
              <div className='description'>
                <div className='title' title={item.title}>
                  {item.title}
                </div>
                <div className='price'>
                  <span className='rupee'>$</span>
                  {item.price}
                </div>
              </div>
            </div>
            <Button
              id={`${item.id}`}
              classname='btn-cart'
              title='Add to Cart'
              handleClick={handleClick}>
              <BsCart4
                className='cart-icon'
                // color='rgb(111, 14, 180)'
                // size='1.3rem'
              />
            </Button>

            {/* <button
              data-key={`${item.id}`}
              onClick={handleClick}
              className='button btn-cart'>
              Add to Cart{' '}
              <BsCart4
                className='cart-icon'
                // color='rgb(111, 14, 180)'
                size='1.3rem'
              />
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clothes;

// const updatedCart = cartItems.reduce((productList, product) => {
//   console.log(`productList ${productList}`);
//   if (product.id === item.id) {
//     const { count } = product;
//     const updatedProduct = { ...product, count: count + 1 };
//     productList = [...productList, updatedProduct];
//   } else {
//     const newItem = { ...item, count: 1 };
//     console.log(newItem);
//     // const product = { [item.id]: { ...item, count: 1 } };
//     productList.push(newItem);
//     // setCartItems((prevState) => ({ ...prevState,
//     //   ...product,
//     // }));
//   }
//   return productList;
// });
// console.log(`UpdatedCart ${updatedCart}`);
// setCartItems(updatedCart);
