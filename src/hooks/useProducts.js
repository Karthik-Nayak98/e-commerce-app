import { useState, useEffect } from 'react';
import {
  MENS_CATEGORY_API,
  WOMENS_CATEGORY_API,
  JEWELERY_CATEGORY_API,
  ELECTRONICS_CATEGORY_API,
} from '../constants/apiurl';

export default function useProducts(apiurl) {
  const [product, setProduct] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urls = {
      mens: MENS_CATEGORY_API,
      womens: WOMENS_CATEGORY_API,
      jewelery: JEWELERY_CATEGORY_API,
      electronics: ELECTRONICS_CATEGORY_API,
    };

    const matched_route = Object.keys(urls).filter((route) => {
      return route.toLowerCase().match(apiurl);
    });

    const API_URL = urls[matched_route[0]] || apiurl;
    async function fetchProducts(API_URL) {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProduct(data);
      setIsLoading(false);
    }
    fetchProducts(API_URL);
  }, [apiurl]);

  return [product, isLoading];
}
