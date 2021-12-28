import React, { useContext } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { CartContext } from '../../context/cartContext';
import Button from '../button/button.component';

const StripeCheckoutButton = ({price}) => {
    const {setCartItems, setTotalPrice, setTotalItems} = useContext(CartContext)
    const priceInCents = price * 100;

    const onToken = token => {
        setCartItems([])
        setTotalItems(0)
        setTotalPrice(0)
    }
    return (
       <StripeCheckout
            label={`Pay Now ($${price})`}
            name='Shoppy'
            // billingAddress
            // shippingAddress
            image='https://www.freakyjolly.com/wp-content/uploads/2020/04/fj-logo.png'
            description='Shopping with style'
            amount={priceInCents}
            token={onToken}
            stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
        > 
        {/* <Button classname='btn-checkout' title='go to checkout'></Button> */}
        </StripeCheckout>

    )
}

export default StripeCheckoutButton

{/* <StripeCheckout 
name="Three Comma Co." // the pop-in header title 
description="Big Data Stuff" // the pop-in header subtitle
  image="https://stripe.com/img/documentation/checkout/marketplace.png" // the pop-in header image (default none)
  ComponentClass="div"
  label="Buy the Thing" // text inside the Stripe button
  panelLabel="Give Money" // prepended to the amount in the bottom pay button
  amount={1000000} // cents
  currency="USD"
  stripeKey="..."
  locale="zh"
  email="info@vidhub.co"
  // Note: Enabling either address option will give the user the ability to
  // fill out both. Addresses are sent as a second parameter in the token callback.
  shippingAddress
  billingAddress={false}
  // Note: enabling both zipCode checks and billing or shipping address will
  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
  zipCode={false}
  alipay // accept Alipay (default false)
  bitcoin // accept Bitcoins (default false)
  allowRememberMe // "Remember Me" option (default true)
  token={this.onToken} // submit callback
  opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
  closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
  // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
  // you are using multiple stripe keys
  reconfigureOnUpdate={false}
  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
  // useful if you're using React-Tap-Event-Plugin
  triggerEvent="onTouchTap"
  >
     <button className="btn btn-primary">
        Use your own child component, which gets wrapped in whatever
        component you pass into as "ComponentClass" (defaults to span)
     </button>
</StripeCheckout>             */}