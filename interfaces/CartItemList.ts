import { Product } from './Product';

export interface CartItemList {
  id: string;
  product: Product;
  quantity: number;
  observation?: string;
}
