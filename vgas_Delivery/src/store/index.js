import { configureStore } from '@reduxjs/toolkit';

import LoginReducer from '../store/accAuth/slide';
import LanguageReducer from '../store/accLanguages/slide';


const rootReducer = {
    Login: LoginReducer,
    Language: LanguageReducer,

};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});


