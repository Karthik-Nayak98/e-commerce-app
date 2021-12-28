import React, { useContext } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { CartContext } from '../../context/cartContext';

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
            shippingAddress
            image='https://i.imgur.com/OtfIonj.png'
            description='Shopping with style'
            amount={priceInCents}
            token={onToken}
            stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
        > 
        </StripeCheckout>

    )
}

export default StripeCheckoutButton