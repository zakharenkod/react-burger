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

export type TIngredientWithCustomId = TIngredient & {
  _customId: string;
};

export type TIngredientType = 'bun' | 'main' | 'sauce';

export type TApiResponse = {
  success: boolean;
};

export type TApiResponseWithData<Data> = TApiResponse & {
  data: Data;
};

export type TOrderRequest = {
  ingredients: string[];
};

export type TOrderResponse = TApiResponse & {
  name: string;
  order: {
    number: number;
  };
};

export type TConstructorDragItem = {
  customId: string;
  originalIndex: number;
};

export type TConstructorDropResult = {
  movedWithinList: boolean;
};
