import React from 'react';
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
