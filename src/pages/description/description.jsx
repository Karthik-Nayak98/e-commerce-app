import React from 'react';
import { useParams } from 'react-router-dom';
import { BsCart4, BsStarFill } from 'react-icons/bs';

import { ALL_PRODUCTS } from '../../constants/apiurl';
import useProducts from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';

import Header from '../../components/header/header.component';
import Button from '../../components/button/button.component';

import './description.styles.css';
import Spinner from '../../components/spinners/spinner';

function Description() {
  const { id } = useParams();
  const [product,isLoading] = useProducts(`${ALL_PRODUCTS}/${id}`);
  const addItemstoCart = useCart();

  function handleClick(event) {
    addItemstoCart(product);
  }

  return isLoading? (<Spinner/>):(
    <div>
      <Header header='Product Description' />
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
                {product.rating.rate}/5.0
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
  ) 
}

export default Description;
