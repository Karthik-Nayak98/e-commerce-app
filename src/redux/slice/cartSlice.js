import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cartslice',
  initialState: {
    cartItems: [],
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload

      const existingItem = state.cartItems.find((item) => item.id === product.id)

      // //  Add new item to the array if the item is not present.
      if (existingItem) {
        existingItem.quantity++
        existingItem.totalPrice += product.price
      } else {
        state.cartItems.push({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: 1,
          totalPrice: product.price,
        })
      }

      // let updatedCart; // Get the index of the item with the id of the product.
      // const index = cartItems.findIndex((item) => item.id === product.id);
      // if (index < 0) { // const newCartItem = { ...product, count: 1, totalPrice: product.price };
      //   const newCartItem = {
      //     id: product.id,
      //     title: product.title,
      //     image: product.image,
      //     price: product.price,
      //     quantity: 1,
      //     totalPrice: product.price,
      //   };
      //   updatedCart = [...cartItems, newCartItem];
      // } else {
      //   updatedCart = [...cartItems];
      //   updatedCart[index] = {
      //     ...updatedCart[index],
      //     quantity: cartItems[index].quantity + 1,
      //     totalPrice: cartItems[index].totalPrice + product.price,
      //   };
      // }
      // state.cartItems = updatedCart;
    },

    removeItem: (state, action) => {
      const cartItems = state.cartItems
      const product = action.payload

      const index = cartItems.findIndex((item) => item.id === product.id)
      cartItems.splice(index, 1)

      // const updatedCart = [...cartItems];

      // updatedCart.splice(index, 1);

      // state.cartItems = updatedCart;
    },

    incrementItem: (state, action) => {
      const cartItems = state.cartItems
      const product = action.payload

      const existingItem = cartItems.find((item) => item.id === product.id)

      existingItem.quantity++
      existingItem.totalPrice += product.price

      // const index = cartItems.findIndex((item) => item.id === product.id);

      // const updatedCart = [...cartItems];
      // updatedCart[index] = {
      //   ...updatedCart[index],
      //   quantity: cartItems[index].quantity + 1,
      //   totalPrice: cartItems[index].totalPrice + product.price,
      // };

      // state.cartItems = updatedCart;
    },

    decrementItem: (state, action) => {
      const cartItems = state.cartItems
      const product = action.payload

      const existingItem = cartItems.find((item) => item.id === product.id)
      const index = cartItems.findIndex((item) => item.id === product.id)

      if (existingItem.quantity > 1) {
        existingItem.quantity--
        existingItem.totalPrice -= product.price
      } else {
        cartItems.splice(index, 1)
      }

      // const index = cartItems.findIndex((item) => item.id === product.id);
      // const updatedCart = [...cartItems];
      // // if (Number(prevQuantity) === 1) {
      // if (cartItems[index].quantity === 1) {
      //   updatedCart.splice(index, 1);
      // } else {
      //   updatedCart[index] = {
      //     ...updatedCart[index],
      //     // quantity: Number(prevQuantity) - 1,
      //     // totalPrice: Number(totalPrice) - prevPrice,

      //     quantity: cartItems[index].quantity - 1,
      //     totalPrice: cartItems[index].totalPrice - product.price,
      //   };
      // }

      // state.cartItems = updatedCart;
    },

    emptyCart: (state, action) => {
      state.cartItems = action.payload
    },

    setCart: (state, action) => {
      const products = action.payload

      // state.cartItems = products;
      if (!products) return

      products.forEach((product) => {
        const existingItem = state.cartItems.find((item) => item.id === product.id)
        if (existingItem) {
          existingItem.quantity += product.quantity
          existingItem.totalPrice += product.totalPrice
        } else {
          state.cartItems.push(product)
        }
      })
    },

    setTotalItems: (state, action) => {
      state.totalItems = action.payload
    },
    incrementItemCount: (state, action) => {
      state.totalItems += action.payload
    },
    decrementItemCount: (state, action) => {
      const totalItems = state.totalItems
      const payload = action.payload

      if (totalItems - payload < 0) state.totalItems = 0
      else state.totalItems -= payload
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    },
    incrementTotalPrice: (state, action) => {
      state.totalPrice += action.payload
    },
    decrementTotalPrice: (state, action) => {
      const totalPrice = state.totalPrice
      const payload = action.payload

      if (totalPrice - payload < 0) state.totalPrice = 0
      else state.totalPrice -= payload
    },
  },
})

export const {
  addItem,
  removeItem,
  decrementItem,
  incrementItem,
  incrementItemCount,
  decrementItemCount,
  incrementTotalPrice,
  decrementTotalPrice,
  setCart,
  setTotalItems,
  setTotalPrice,
  emptyCart,
} = cartSlice.actions
export default cartSlice.reducer
