import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import './MenuItem.css';

function MenuItem({ title, imageUrl, category }) {
  return (
    <div style={{ backgroundImage: `url(${imageUrl})` }} className='menu-item'>
      <Link to={`category/${category}`} className='link'>
        <div className='content'>
          <h2 className='title'>{title}</h2>
          <span className='subtitle'>Shop Now</span>
        </div>
      </Link>
    </div>
  );
}

export default MenuItem;

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
