import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { EmptyCart, Header, Product } from '../../components';
import useToast from '../../hooks/useToast';

import { MdDeleteForever } from 'react-icons/md';
import {
  addItem,
  incrementItemCount,
  incrementTotalPrice,
  removeFromWishlist,
} from '../../redux/slice/cartSlice';

export default function Wishlist() {
  const { wishlist } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { successToast, errorToast } = useToast();

  function handleDelete(product) {
    dispatch(removeFromWishlist(product));
    errorToast('Item deleted from wishlist');
  }

  function handleCart(product) {
    dispatch(addItem(product));
    dispatch(removeFromWishlist(product));
    dispatch(incrementItemCount(1));
    dispatch(incrementTotalPrice(product.price));
    successToast('Item moved to cart');
  }

  return wishlist.length ? (
    <section>
      <Header header='Wishlist' />
      <ToastContainer />
      <div className='product-container'>
        {wishlist.map((item) => (
          <Product
            key={item.id}
            item={item}
            icon={<MdDeleteForever />}
            color='#df1a1a'
            handleWishlist={handleDelete}
            handleCart={handleCart}
          />
        ))}
      </div>
    </section>
  ) : (
    <EmptyCart
      heading='Your wishlist is empty!'
      message='Explore more and shortlist some items.'
    />
  );
}
