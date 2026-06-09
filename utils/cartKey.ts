import { Product } from '@/interfaces/Product';

export const cartKey = (product: Pick<Product, 'kind' | 'id'>): string =>
  `${product.kind}-${product.id}`;

export default cartKey;
