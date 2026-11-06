import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@utils/types.ts';

type TIngredientInfoState = {
  selectedIngredient: TIngredient | null;
};

const initialState: TIngredientInfoState = {
  selectedIngredient: null,
};

export const ingredientInfoModalSlice = createSlice({
  name: 'ingredientInfo',
  initialState,
  reducers: {
    setIngredientInfo: (state, action: PayloadAction<TIngredient>) => {
      state.selectedIngredient = action.payload;
    },

    clearIngredientInfo: (state) => {
      state.selectedIngredient = null;
    },
  },
  selectors: {
    getSelectedIngredient: (state) => state.selectedIngredient,
  },
});

export const { getSelectedIngredient } = ingredientInfoModalSlice.selectors;

export const { setIngredientInfo, clearIngredientInfo } =
  ingredientInfoModalSlice.actions;
