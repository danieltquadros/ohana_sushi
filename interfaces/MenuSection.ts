import { Product } from './Product';

export type MenuSectionKind = 'PRODUCT_TYPE' | 'COMBOS';

export interface MenuSection {
  id: number;
  label: string;
  order: number;
  kind: MenuSectionKind;
  items: Product[];
}
