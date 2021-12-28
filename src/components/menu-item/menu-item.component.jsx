import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import './menu-item.styles.css';
function MenuItem({ title, imageUrl, url }) {
  return (
    <div style={{ backgroundImage: `url(${imageUrl})` }} className='menu-item'>
      <Link to={`/${url}`} className='link'>
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
  url: PropTypes.string.isRequired,
}