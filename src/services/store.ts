import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { constructorIngredientsSlice } from '@services/constructor-ingredients/slice.ts';
import { ingredientInfoModalSlice } from '@services/ingredient-info/slice.ts';
import { ingredientsSlice } from '@services/ingredients/slice.ts';
import { orderSlice } from '@services/order/slice.ts';

const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientInfoModalSlice,
  orderSlice,
  constructorIngredientsSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
