import { useSelector } from 'react-redux'
export default function useCart() {
  const cartItems = useSelector((state) => state.cart.cartItems)

  function addItemsToCart(product) {
    let updatedCart
    // Get the index of the item with the id of the product.
    const index = cartItems.findIndex((item) => item.id === product.id)
    //  Add new item to the array if the item is not present.
    if (index < 0) {
      const newCartItem = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
        totalPrice: product.price,
      }
      updatedCart = [...cartItems, newCartItem]
    } else {
      updatedCart = [...cartItems]
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: cartItems[index].quantity + 1,
        totalPrice: cartItems[index].totalPrice + product.price,
      }
    }
  }
  return addItemsToCart
}
