import {
  createSelector,
  createSlice,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { TIngredient, TIngredientWithCustomId } from '@utils/types.ts';

type TConstructorIngredientState = {
  bun: TIngredient | null;
  ingredients: TIngredientWithCustomId[];
};

const initialState: TConstructorIngredientState = {
  bun: null,
  ingredients: [],
};

export const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, _customId: nanoid() },
      }),
      reducer: (state, action: PayloadAction<TIngredientWithCustomId>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;

          return;
        }

        state.ingredients.push(action.payload);
      },
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        ({ _customId }) => _customId !== action.payload
      );
    },

    changeIngredientPosition: (
      state,
      action: PayloadAction<{ customId: string; toIndex: number }>
    ) => {
      const { customId, toIndex } = action.payload;
      const fromIndex = state.ingredients.findIndex(
        ({ _customId }) => _customId === customId
      );

      if (fromIndex === -1 || fromIndex === toIndex) {
        return;
      }

      const [ingredient] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, ingredient);
    },

    clearConstructorIngredients: (state) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    },
  },

  selectors: {
    getConstructorBun: (state) => state.bun,
    getConstructorIngredients: (state) => state.ingredients,
  },
});

export const {
  addIngredient,
  removeIngredient,
  changeIngredientPosition,
  clearConstructorIngredients,
} = constructorIngredientsSlice.actions;

export const { getConstructorBun, getConstructorIngredients } =
  constructorIngredientsSlice.selectors;

export const getConstructorTotalPrice = createSelector(
  [getConstructorBun, getConstructorIngredients],
  (bun, ingredients) => {
    const bunCost = bun ? bun.price * 2 : 0;
    const ingredientsCost = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );

    return Number((bunCost + ingredientsCost).toFixed(2));
  }
);

export const getIngredientCounts = createSelector(
  [getConstructorBun, getConstructorIngredients],
  (bun, ingredients) => {
    const ingredientsCount = new Map<string, number>();
    ingredients.reduce((acc, { _id: id }) => {
      acc.set(id, (acc.get(id) ?? 0) + 1);

      return acc;
    }, ingredientsCount);

    if (bun) {
      ingredientsCount.set(bun._id, 2);
    }

    return ingredientsCount;
  }
);
