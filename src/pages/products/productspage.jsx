import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';

import useProducts from '../../hooks/useProducts';

import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';

import './products.styles.css';
import Spinner from '../../components/spinners/spinner.jsx';
import {
  incrementItemCount,
  incrementTotalPrice,
  addItem,
} from '../../redux/slice/cartSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';

function Products() {
  const params = useLocation();
  const route = params.pathname.split('/')[1];
  const [productList, isLoading] = useProducts(route);
  const dispatch = useDispatch();

  function handleClick(event, product) {
    dispatch(addItem(product));
    dispatch(incrementItemCount(1));
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

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Header header={`${route.toUpperCase()} CATEGORY`} />
      <ToastContainer />
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
              onClick={(event) => handleClick(event, item)}>
              <BsCart4 pointerEvents='none' className='cart-icon' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
