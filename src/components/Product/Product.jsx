import PropTypes from 'prop-types';
import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Icon } from '../../components';

import './Product.css';

export default function Product({ item, handleCart, handleWishlist, icon, color }) {
  const { title, id, image, price, outofStock } = item;

  return (
    <div key={item.id} className='products'>
      <div className='product'>
        <Link to={`/product/${id}`}>
          <figure className='product-image'>
            <figcaption
              className={`${outofStock ? 'unavailable' : 'available'} status`}>
              {outofStock ? 'out of stock' : 'available'}
            </figcaption>
            <img src={image} alt={title} />
          </figure>
        </Link>
        <div className='description'>
          <div className='title' title={title}>
            {title}
          </div>
          <div className='price-container'>
            <div className='price'>
              <span className='rupee'>₹</span>
              {price}
            </div>
            <Icon
              icon={icon}
              fontSize='1.4rem'
              color={color}
              handleWishlist={() => handleWishlist(item)}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={outofStock}
        data-id={`${id}`}
        classname='btn-cart'
        title='Add to Cart'
        onClick={() => handleCart(item)}>
        <BsCart4 pointerEvents='none' className='cart-icon' />
      </Button>
    </div>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  handleCart: PropTypes.func.isRequired,
  handleWishlist: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};
