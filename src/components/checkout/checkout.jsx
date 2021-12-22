import React from 'react'
import Button from '../button/button.component'

import './checkout.styles.css'

const Checkout =({totalPrice}) => {
    return (
        <div className='checkout__container'>
          <p className='checkout__title'>Order Summary</p>
          <div className='checkout-price__container'>
            <div className='subtotal'>
              <span>SubTotal</span>
              <span className='totalprice'>$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className='shipping'>
              <span>Shipping</span>
              <span className='totalprice'>$ 0</span>
            </div>
          </div>
          <div className='grandtotal'>
            <span>Grand total</span>
            <span className='totalprice'>$ {totalPrice.toFixed(2)}</span>
          </div>
          <Button classname='btn-checkout' title='go to checkout'></Button>
        </div>
            
    )
}

export default Checkout

