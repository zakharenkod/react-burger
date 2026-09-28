import { API_URL } from '@utils/constants.ts';

import type { TApiResponse, TIngredient } from '@utils/types.ts';

const httpClient = async <Data>(
  url: string,
  options?: RequestInit
): Promise<TApiResponse<Data>> => {
  const response = await fetch(`${API_URL}${url}`, options);

  if (!response.ok) {
    throw new Error('Failed to fetch API response');
  }

  const result = (await response.json()) as TApiResponse<Data>;

  if (!result.success) {
    throw new Error('API request error');
  }

  return result;
};

const getIngredients = async (): Promise<TIngredient[]> => {
  const result = await httpClient<TIngredient[]>('ingredients');

  return result.data;
};

export const api = { getIngredients };
