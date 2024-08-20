import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  languageTypes: null,
  languageDetails: null,
  locale: null,
};

export const languagesSlice = createSlice({
  name: 'languages',
  initialState: initialState,
  reducers: {
    updateLocale: (state, action) => {
      state.locale = action.payload;
    },
    fetchLanguageType: (state, action) => {
      state.languageTypes = action.payload;
    },
    fetchLanguageDetails: (state, action) => {
      state.languageDetails = action.payload;
    },
    resetLanguages: state => initialState,
  },
});

export const {
  updateLocale,
  fetchLanguageType,
  fetchLanguageDetails,
  resetLanguages,
} = languagesSlice.actions;

export const selectLanguageDetailsAndLocale = state => {
  return {
    languageDetails: state.Language.languageDetails,
    locale: state.Language.locale,
  };
};

export const translateLang = createSelector(
  [selectLanguageDetailsAndLocale],
  ({ languageDetails, locale }) => key => {
    const str = languageDetails[locale?.Code]?.[key];
    return str?.length ? str : (__DEV__ ? key : '');
  }
);

export default languagesSlice.reducer;
