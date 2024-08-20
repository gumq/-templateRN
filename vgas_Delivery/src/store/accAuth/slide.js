import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  changePass: [],
  ruleFormatCurrency: 'VN',
  ruleFormatDecimal: 2,
  inforCompany: [],
  isSubmitting: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
    updateChangePass: (state, action) => {
      state.changePass = action.payload;
    },
    updateRuleFormatCurrency: (state, action) => {
      state.ruleFormatCurrency = action.payload;
    },
    updateRuleFormatDecimal: (state, action) => {
      state.ruleFormatDecimal = action.payload;
    },
    updateInforCompany: (state, action) => {
      state.inforCompany = action.payload;
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
  updateUser,
  updateRuleFormatCurrency,
  updateRuleFormatDecimal,
  resetUser,
  updateChangePass,
  updateInforCompany,
  setIsSubmitting
} = userSlice.actions;

export default userSlice.reducer;
