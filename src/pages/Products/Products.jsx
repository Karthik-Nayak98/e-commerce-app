import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsHeart } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header, Product, Spinner } from '../../components';
import useToast from '../../hooks/useToast';
import {
  addItem,
  addToWishlist,
  incrementItemCount,
  incrementTotalPrice,
} from '../../redux/slice/cartSlice';

import 'react-toastify/dist/ReactToastify.css';

import './Products.css';

function Products() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { successToast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/category/${categoryId}`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);

  function handleWishlist(product) {
    dispatch(addToWishlist(product));
    successToast('Item added to wishlist');
  }

  function handleCart(product) {
    dispatch(addItem(product));
    dispatch(incrementItemCount(1));
    dispatch(incrementTotalPrice(product.price));
    successToast('Item added to cart');
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Header header={`${categoryId.toUpperCase()} CATEGORY`} />
      <ToastContainer />
      <div className='product-container'>
        {products?.map((item) => (
          <Product
            key={item.id}
            item={item}
            icon={<BsHeart />}
            color='#720eb4'
            handleCart={handleCart}
            handleWishlist={handleWishlist}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
