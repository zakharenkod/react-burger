import { API_URL } from '@utils/constants.ts';

import type {
  TApiResponse,
  TApiResponseWithData,
  TIngredient,
  TOrderRequest,
  TOrderResponse,
} from '@utils/types.ts';

const httpClient = async <Response extends TApiResponse>(
  url: string,
  options?: RequestInit
): Promise<Response> => {
  const response = await fetch(`${API_URL}${url}`, options);

  if (!response.ok) {
    throw new Error('Failed to fetch API response');
  }

  const result = (await response.json()) as Response;

  if (!result.success) {
    throw new Error('API request error');
  }

  return result;
};

const getIngredients = async (): Promise<TIngredient[]> => {
  const result = await httpClient<TApiResponseWithData<TIngredient[]>>('ingredients');

  return result.data;
};

const createOrder = async (data: TOrderRequest): Promise<TOrderResponse> => {
  return await httpClient<TOrderResponse>('orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const api = { getIngredients, createOrder };
