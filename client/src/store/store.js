import { configureStore } from '@reduxjs/toolkit';
 import dataReducer from './shoppingListStore';
export const store = configureStore({
    reducer: {
      data: dataReducer,
          },})