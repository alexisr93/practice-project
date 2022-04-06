import { configureStore } from '@reduxjs/toolkit';
import modalDataReducer from './slices/editUserModalSlice';

export const store = configureStore({
    reducer: {
        modalData: modalDataReducer,
    },
});