import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menus: [],
  isSubmitting: false
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    updateMenu: (state, action) => {
      state.menus = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    resetUser: state => {
      return initialState;
    },
  },
});

export const {
  updateMenu,
  setIsSubmitting
} = homeSlice.actions;

export default homeSlice.reducer;
