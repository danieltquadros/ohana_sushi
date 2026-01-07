import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const { type } = req.query;

      const products = await prisma.product.findMany({
        where:
          type && type !== 'ALL'
            ? { type: { name: type as string } } // 👈 Filtrar pelo nome do tipo relacionado
            : {},
        include: {
          ingredients: true,
          type: true,
        },
        orderBy: {
          order: 'asc',
        },
      });

      return res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, image, price, productTypeId, order, ingredients } =
        req.body; // 👈 Mudou para productTypeId

      const product = await prisma.product.create({
        data: {
          title,
          image,
          price,
          productTypeId, // 👈 Agora passa o ID
          order,
          ingredients: {
            create: ingredients.map((ingredient: any) => ({
              name: ingredient.name,
              quantity: ingredient.quantity,
            })),
          },
        },
        include: {
          ingredients: true,
          type: true, // 👈 Adicione isso também aqui para retornar o tipo completo
        },
      });

      return res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ error: 'Failed to create product' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
