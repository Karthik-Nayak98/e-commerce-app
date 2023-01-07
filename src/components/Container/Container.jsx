import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MenuItem, Spinner } from '..';

import './Container.css';

function Container() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/categories')
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='container'>
      {categories.map(({ id, title, imageUrl, url }) => (
        <MenuItem key={id} title={title} imageUrl={imageUrl} category={url} />
      ))}
    </div>
  );
}

export default Container;
