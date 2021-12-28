import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';

import useCart from '../../hooks/useCart.js';
import useProducts from '../../hooks/useProducts';

import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';

import './products.styles.css';
import Spinner from '../../components/spinners/spinner.jsx';

function Products() {
  const params = useLocation();
  const route = params.pathname.split('/')[1];
  const [productList, isLoading] = useProducts(route);
  const addItemstoCart = useCart();

  function handleClick(event) {
    const id = event.target.dataset.id;

    const clickedProduct = productList.filter(
      (product) => Number(product.id) === Number(id)
    );

    const product = clickedProduct[0];
    addItemstoCart(product);
  }

  return (
    isLoading? (<Spinner/>):(
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
              data-id={`${item.id}`}
              classname='btn-cart'
              title='Add to Cart'
              onClick={handleClick}>
              <BsCart4 pointerEvents='none' className='cart-icon' />
            </Button>
          </div>
        ))}
      </div>
    </div>
    )
  );
}

export default Products;
