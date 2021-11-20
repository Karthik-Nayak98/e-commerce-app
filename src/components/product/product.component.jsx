import React from 'react';

import { BsCart4 } from 'react-icons';

function Product({ item, handleClick }) {
  return (
    <div key={item.id} className='products'>
      <div className='product'>
        <figure className='product-image'>
          <img src={item.imageUrl} alt={item.title} />
        </figure>
        <div className='description'>
          <div className='title' title={item.title}>
            {item.title}
          </div>
          <div className='price'>
            {/* <span className='rupee'>₹</span> */}
            <span className='rupee'>$</span>
            {item.price}
          </div>
        </div>
      </div>
      <button
        data-key={`${item.id}`}
        onClick={(event) => {
          handleClick(event);
        }}
        className='button btn-cart'>
        Add to Cart{' '}
        <BsCart4
          className='cart-icon'
          // color='rgb(111, 14, 180)'
          size='1.3rem'
        />
      </button>
    </div>
  );
}

export default Product;
