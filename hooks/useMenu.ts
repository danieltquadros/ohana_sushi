import { useEffect, useState } from 'react';
import { MenuSection } from '@/interfaces/MenuSection';
import { Product } from '@/interfaces/Product';

interface UseMenuReturn {
  sections: MenuSection[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface RawProduct {
  id: number;
  title: string;
  image: string;
  price: string | number;
  order: number;
  ingredients: Array<{
    quantity: number;
    ingredient: { id: number; name: string };
  }>;
}

interface RawComboProduct {
  productId: number;
  quantity: number;
  product: { id: number; title: string; image?: string; price?: string | number };
}

interface RawCombo {
  id: number;
  name: string;
  image: string;
  price: string | number;
  order: number;
  products: RawComboProduct[];
}

interface RawSection {
  id: number;
  label: string;
  order: number;
  kind: 'PRODUCT_TYPE' | 'COMBOS';
  items: RawProduct[] | RawCombo[];
}

const adaptProduct = (raw: RawProduct): Product => ({
  id: raw.id,
  title: raw.title,
  image: raw.image,
  price: typeof raw.price === 'string' ? parseFloat(raw.price) : raw.price,
  kind: 'PRODUCT',
  order: raw.order,
  ingredientList: raw.ingredients.map((ing) => ({
    id: ing.ingredient.id,
    name: ing.ingredient.name,
    quantity: ing.quantity,
  })),
});

const adaptCombo = (raw: RawCombo): Product => ({
  id: raw.id,
  title: raw.name,
  image: raw.image,
  price: typeof raw.price === 'string' ? parseFloat(raw.price) : raw.price,
  kind: 'COMBO',
  order: raw.order,
  ingredientList: raw.products.map((cp) => ({
    id: cp.product.id,
    name: cp.product.title,
    quantity: cp.quantity,
  })),
});

export const useMenu = (): UseMenuReturn => {
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await fetch(`${apiUrl}/menu`);

      if (!response.ok) {
        throw new Error(`Failed to fetch menu: ${response.status}`);
      }

      const data: RawSection[] = await response.json();

      const adapted: MenuSection[] = data.map((section) => ({
        id: section.id,
        label: section.label,
        order: section.order,
        kind: section.kind,
        items:
          section.kind === 'COMBOS'
            ? (section.items as RawCombo[]).map(adaptCombo)
            : (section.items as RawProduct[]).map(adaptProduct),
      }));

      setSections(adapted);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return {
    sections,
    loading,
    error,
    refetch: fetchMenu,
  };
};

export default useMenu;
