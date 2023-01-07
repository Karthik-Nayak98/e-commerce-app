import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userslice',
  initialState: { uid: null, show: false },
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload;
    },

    setShow: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setShow, setUser } = userSlice.actions;
export default userSlice.reducer;
