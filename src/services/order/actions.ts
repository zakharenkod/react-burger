import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@utils/api.ts';

import type { TOrderRequest } from '@utils/types.ts';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: TOrderRequest) => {
    return api.createOrder(orderData);
  }
);
