import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@utils/api.ts';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    return api.getIngredients();
  }
);
