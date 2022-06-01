import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userslice',
  initialState: { uid: null },
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
