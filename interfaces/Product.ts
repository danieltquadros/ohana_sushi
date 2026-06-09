import { Ingredient } from './Ingredient';

export type ProductKind = 'PRODUCT' | 'COMBO';

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  kind: ProductKind;
  order: number;
  ingredientList: Ingredient[];
}
