import React from 'react'
import { useParams } from 'react-router-dom'
import { BsCart4, BsStarFill } from 'react-icons/bs'

import { ALL_PRODUCTS } from '../../constants/apiurl'
import useProducts from '../../hooks/useProducts'

import Header from '../../components/header/header.component'
import Button from '../../components/button/button.component'

import './description.styles.css'
import Spinner from '../../components/spinners/spinner'
import {
  addItem,
  incrementItemCount,
  incrementTotalPrice,
} from '../../redux/slice/cartSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch } from 'react-redux'

function Description() {
  const { id } = useParams()
  const [product, isLoading] = useProducts(`${ALL_PRODUCTS}/${id}`)
  const dispatch = useDispatch()

  function handleClick(event) {
    dispatch(addItem(product))
    dispatch(incrementItemCount(1))
    dispatch(incrementTotalPrice(product.price))
    toast.success('Item added to cart', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Header header='Product Description' />
      <ToastContainer />
      <div className='product__container'>
        <figure className='product__image'>
          <img src={product.image} alt={product.title} />
        </figure>
        <div className='product-description'>
          <p className='product-description__title'>{product.title}</p>
          <div className='product-description__container'>
            <span className='product-description__rating'>
              <BsStarFill className='product-description__rating--icon' />
              <p className='product-description__rating--rate'>
                {product.rating.rate}/5.0
              </p>
            </span>
            <span className='product-description__price'>${product.price}</span>
          </div>
          <p className='product-description__text'>{product.description}</p>

          <Button
            data-id={`${product.id}`}
            classname='product-description__button btn-cart'
            title='Add to Cart'
            onClick={handleClick}>
            <BsCart4 className='cart-icon' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Description
