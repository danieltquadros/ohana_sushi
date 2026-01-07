import { PrismaClient } from '@prisma/client';
import productList from '../components/Showcase/productList';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data (ordem importa por causa das relações!)
  await prisma.ingredient.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productType.deleteMany(); // 👈 Adicione esta linha

  // 👇 --- INÍCIO DA MUDANÇA --- 👇
  // Passo 1: Criar todos os tipos de produto
  console.log('📦 Creating product types...');

  const productTypes = [
    'ALL',
    'COMBO',
    'PORTION',
    'POKES',
    'YAKISOBA',
    'MEGA_HOT',
    'TEMAKI',
    'ITEM',
    'DRINK',
    'OTHER',
    'URAMAKIS',
    'HOTS',
    'HOSSOS',
  ];

  // Criar os tipos e guardar em um mapa { nome: id }
  const typeMap: Record<string, number> = {};

  for (const typeName of productTypes) {
    const createdType = await prisma.productType.create({
      data: { name: typeName },
    });
    typeMap[typeName] = createdType.id;
  }

  console.log(`✅ Created ${productTypes.length} product types`);
  // 👆 --- FIM DA MUDANÇA --- 👆

  // Passo 2: Criar os produtos usando o typeMap
  console.log('🍣 Creating products...');

  for (const product of productList) {
    await prisma.product.create({
      data: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,

        // 👇 --- INÍCIO DA MUDANÇA --- 👇
        productTypeId: typeMap[product.type], // Agora usamos o ID do tipo
        // 👆 --- FIM DA MUDANÇA --- 👆

        order: product.order,
        ingredients: {
          create: product.ingredientList.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
          })),
        },
      },
    });
  }

  console.log(`✅ Seeded ${productList.length} products`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
