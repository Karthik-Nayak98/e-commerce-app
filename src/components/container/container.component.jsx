import React, { useState } from 'react';
import MenuItem from '../menu-item/menu-item.component';

import { categoryData } from './category.data';
import './container.styles.css';

function Container() {
  const [menuItems] = useState(categoryData);
  return (
    <div className='container'>
      {menuItems.map(({ id, title, imageUrl, url }) => (
        <MenuItem key={id} title={title} imageUrl={imageUrl} url={url} />
      ))}
    </div>
  );
}

export default Container;
