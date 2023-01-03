import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartslice',
  initialState: {
    cartItems: [],
    wishlist: [],
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.wishlist.find((item) => item.id === product.id);
      if (!existingItem) state.wishlist.push(product);
    },

    removeFromWishlist: (state, action) => {
      const wishlist = state.wishlist;
      const product = action.payload;

      const index = wishlist.findIndex((item) => item.id === product.id);
      wishlist.splice(index, 1);
    },

    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === product.id);

      //  Add new item to the array if the item is not present.
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += product.price;
      } else {
        state.cartItems.push({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: 1,
          totalPrice: product.price,
        });
      }
    },

    removeItem: (state, action) => {
      const cartItems = state.cartItems;
      const product = action.payload;

      const index = cartItems.findIndex((item) => item.id === product.id);
      cartItems.splice(index, 1);
    },

    incrementItem: (state, action) => {
      const cartItems = state.cartItems;
      const product = action.payload;

      const existingItem = cartItems.find((item) => item.id === product.id);

      existingItem.quantity++;
      existingItem.totalPrice += product.price;
    },

    decrementItem: (state, action) => {
      const cartItems = state.cartItems;
      const product = action.payload;

      const existingItem = cartItems.find((item) => item.id === product.id);
      const index = cartItems.findIndex((item) => item.id === product.id);

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= product.price;
      } else {
        cartItems.splice(index, 1);
      }
    },

    emptyCart: (state, action) => {
      state.cartItems = action.payload;
    },

    emptyWishlist: (state, action) => {
      state.wishlist = action.payload;
    },

    setWishlist: (state, action) => {
      const products = action.payload;

      if (!products) return;

      products.forEach((product) => {
        const existingItem = state.wishlist.find((item) => item.id === product.id);
        if (!existingItem) state.wishlist.push(product);
      });
    },

    setCart: (state, action) => {
      const products = action.payload;

      // state.cartItems = products;
      if (!products) return;

      products.forEach((product) => {
        const existingItem = state.cartItems.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += product.quantity;
          existingItem.totalPrice += product.totalPrice;
        } else {
          state.cartItems.push(product);
        }
      });
    },

    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },

    incrementItemCount: (state, action) => {
      state.totalItems += action.payload;
    },

    decrementItemCount: (state, action) => {
      const totalItems = state.totalItems;
      const payload = action.payload;

      if (totalItems - payload < 0) state.totalItems = 0;
      else state.totalItems -= payload;
    },

    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },

    incrementTotalPrice: (state, action) => {
      state.totalPrice += action.payload;
    },

    decrementTotalPrice: (state, action) => {
      const totalPrice = state.totalPrice;
      const payload = action.payload;

      if (totalPrice - payload < 0) state.totalPrice = 0;
      else state.totalPrice -= payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  addToWishlist,
  removeFromWishlist,
  decrementItem,
  incrementItem,
  incrementItemCount,
  decrementItemCount,
  incrementTotalPrice,
  decrementTotalPrice,
  setCart,
  setTotalItems,
  setWishlist,
  setTotalPrice,
  emptyCart,
  emptyWishlist,
} = cartSlice.actions;
export default cartSlice.reducer;
