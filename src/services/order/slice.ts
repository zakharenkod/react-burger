import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createOrder } from '@services/order/actions.ts';

import type { TOrderResponse } from '@utils/types.ts';

type TOrderState = {
  data: TOrderResponse | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  data: null,
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.data = null;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<TOrderResponse>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
  selectors: {
    getOrder: (state) => state.data,
    getOrderLoading: (state) => state.isLoading,
    getOrderError: (state) => state.error,
  },
});

export const { getOrder, getOrderLoading, getOrderError } = orderSlice.selectors;
