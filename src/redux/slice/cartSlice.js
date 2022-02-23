import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartslice',
  initialState: {
    cartItems: [],
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    updateCart: (state, action) => {
      state.cartItems = action.payload;
    },
    incrementItems: (state, action) => {
      state.totalItems += action.payload;
    },
    decrementItems: (state, action) => {
      state.totalItems -= action.payload;
    },
    incrementTotalPrice: (state, action) => {
      state.totalPrice += action.payload;
    },
    decrementTotalPrice: (state, action) => {
      state.totalPrice -= action.payload;
    },
  },
});

export const {
  updateCart,
  incrementItems,
  incrementTotalPrice,
  decrementItems,
  decrementTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
