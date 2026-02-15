import { useState, useEffect } from 'react';
import { Product } from '@/interfaces/Product';

interface UseProductsOptions {
  type?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProducts = (
  options: UseProductsOptions = {},
): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.type && options.type !== 'ALL') {
        params.append('type', options.type);
      }

      // Usar backend API ao invés de API routes locais
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const response = await fetch(`${apiUrl}/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();

      // Transform API response to match frontend interface
      const transformedProducts: Product[] = data
        .filter((product: any) => product.price > 0)
        .map((product: any) => {
          return {
            id: product.id,
            title: product.title,
            image: product.image,
            price: parseFloat(product.price), // Backend retorna string, converter para number
            type: product.type.name, // Extrair nome do tipo
            order: product.order,
            ingredientList: product.ingredients.map((ing: any) => ({
              id: ing.ingredient.id, // Acessar ingredient aninhado
              name: ing.ingredient.name,
              quantity: ing.quantity,
            })),
          };
        });

      setProducts(transformedProducts);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [options.type]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};

export default useProducts;
