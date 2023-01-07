import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsCart4, BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import { Button, Header, Spinner } from '../../components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addItem,
  incrementItemCount,
  incrementTotalPrice,
} from '../../redux/slice/cartSlice';
import './description.styles.css';

import { useDispatch } from 'react-redux';
import useToast from '../../hooks/useToast';

function Description() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { successToast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);

  function handleClick() {
    dispatch(addItem(product));
    dispatch(incrementItemCount(1));
    dispatch(incrementTotalPrice(product.price));
    successToast('Item added to cart');
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Header header='Product Description' />
      <ToastContainer />
      <div className='product__container'>
        <figure className='product__image'>
          <img src={product.image} alt={product.title} />
        </figure>
        <div className='product-description'>
          <p className='product-description__title'>{product.title}</p>
          <div className='product-description__container'>
            <span className='product-description__rating'>
              <BsStarFill className='product-description__rating--icon' />
              <p className='product-description__rating--rate'>
                {product.rating}/5.0
              </p>
            </span>
            <span className='product-description__price'>${product.price}</span>
          </div>
          <p className='product-description__text'>{product.description}</p>

          <Button
            data-id={`${product.id}`}
            classname='product-description__button btn-cart'
            title='Add to Cart'
            onClick={handleClick}>
            <BsCart4 className='cart-icon' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Description;
