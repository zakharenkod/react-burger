export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TIngredientType = 'bun' | 'main' | 'sauce';

export type TApiResponse<Data> = {
  success: boolean;
  data: Data;
};

export type TOrder = {
  id: string;
  title: string;
  description: string;
};
