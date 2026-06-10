import { Product } from '@/interfaces/Product';
import { cartKey } from '@/utils/cartKey';
import { ProductCardContainerFlex } from './styles';
import { Flex, Tag, Typography } from 'antd';
import calculateComboTotalItems from '@/utils/calculateComboTotalItems';
import ChooseButton from '../ChooseButton';
import { CartInterface } from '@/interfaces/CartInterface';
import { useAppSelector } from '@/hooks/redux';
import useResponsive from '@/hooks/useResponsive';
import { useState } from 'react';
import Image from 'next/image';

import './styles.css';
import ProductModal from '../ProductModal';

interface ProductCardProps {
  product: Product;
  position: number | null;
}

const ProductCard = ({ product, position }: ProductCardProps) => {
  const cart: CartInterface | null = useAppSelector((state) => state.cart.cart);

  const { Title, Text } = Typography;
  const { isMdDown, isXs } = useResponsive();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [hasItem, setHasItem] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const findProductQuantityInCart = () => {
    if (cart) {
      const key = cartKey(product);
      const hasProduct = cart.cartItemList.find((cil) => cil.id === key);
      if (hasProduct && hasProduct.id) {
        return true;
      }
      return false;
    }
    return false;
  };

  return (
    <ProductCardContainerFlex
      $hasProduct={findProductQuantityInCart()}
      $isXs={isXs}
      $isMdDown={isMdDown}
      $position={position}
      vertical
      justify="space-between"
    >
      <Flex
        vertical
        style={{
          padding: '8px 8px 0 8px',
          height: '100%',
          background: '#fff',
          borderRadius:
            isXs && position === 0
              ? '3px 0 0 3px'
              : isXs && position === 1
                ? '0 3px 3px 0'
                : isXs && position === 2
                  ? '3px 0 0 3px'
                  : isXs && position === 3
                    ? '0 3px 3px 0'
                    : '3px 3px 0 0',
        }}
      >
        <Flex
          gap={4}
          align="center"
          justify="space-between"
          style={{ cursor: 'pointer', marginBottom: '8px' }}
          onClick={() => setOpenProductModal(true)}
          vertical={isXs}
        >
          <Title
            level={5}
            style={{
              margin: 0,
              fontSize: `${product.title.length > 16 ? '1.2rem' : isMdDown ? '1.2rem' : '1.4rem'}`,
              fontWeight: 700,
              fontFamily: 'var(--inria-sans) !important',
              lineHeight: 1.1,
              height: '42px',
              alignContent: 'center',
            }}
          >
            {product.title}
          </Title>
          {product.kind === 'COMBO' ? (
            <Tag
              style={{
                marginInlineEnd: '0px',
                marginBottom: isXs ? '4px' : '',
                border: isXs ? '1px solid #333' : 'none',
                width: isXs ? '100%' : 'auto',
                textAlign: isXs ? 'center' : 'left',
              }}
              color={isXs ? '#FFF' : '#000'}
            >
              <Text
                style={{
                  fontSize: '0.8rem',
                  color: isXs ? '#333' : '#fff',

                  padding: isXs ? '2px 4px' : '0',

                  lineHeight: 1.1,
                  fontWeight: 600,
                }}
              >
                {`${calculateComboTotalItems(product.ingredientList)} peças`}
              </Text>
            </Tag>
          ) : null}
        </Flex>
        <Flex vertical justify="space-between" style={{ height: '100%' }}>
          <Flex vertical>
            {imageError ? (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  background: '#f0f0f0',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  cursor: 'pointer',
                }}
                onClick={() => setOpenProductModal(true)}
              >
                <Text style={{ fontSize: '0.8rem' }}>
                  Imagem não disponível
                </Text>
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  position: 'relative',
                  background: imageLoading ? '#f0f0f0' : '#fff',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => setOpenProductModal(true)}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100px, (max-width: 992px) 160px, 240px"
                  style={{
                    objectFit: 'cover',
                  }}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  unoptimized={true}
                />
              </div>
            )}
            <Text
              ellipsis
              style={{
                color: '#333',
                padding: '8px 4px 6px 4px',
                cursor: 'pointer',
              }}
              onClick={() => setOpenProductModal(true)}
            >
              {product.ingredientList.map((ingredient, index) => {
                return `${ingredient.quantity} ${ingredient.name} ${index < product.ingredientList.length - 1 ? ', ' : ''}`;
              })}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        justify="space-between"
        align={isXs ? 'flex-end' : 'center'}
        style={{
          background: '#000',
          padding: '8px',
          borderTop: isXs ? 'none' : '1px solid #d9d9d9',
          borderRadius:
            isXs && position === 0
              ? '0 0 0 3px'
              : isXs && position === 1
                ? '0 0 3px 0'
                : isXs && position === 2
                  ? '0 0 0 3px'
                  : isXs && position === 3
                    ? '0 0 3px 0'
                    : '0 0 3px 3px',
          overflow: 'hidden',
          height: '100%',
          flexDirection: isXs ? 'column-reverse' : 'row',
        }}
        gap={8}
        // vertical={isXs}
      >
        <Title
          level={5}
          style={{
            marginBottom: 0,
            marginTop: 0,
            lineHeight: 1.2,
            color: '#fff',
            fontSize: '1.3rem',
            fontFamily: 'var(--inria-sans) !important',
            width: 'fit-content',
            wordBreak: 'keep-all',
          }}
        >
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.price)}
        </Title>
        <ChooseButton
          product={product}
          sunButton
          hasItem={hasItem}
          onHasItem={setHasItem}
        />
      </Flex>
      <ProductModal
        isModalOpen={openProductModal}
        onModalClose={() => setOpenProductModal(false)}
        product={product}
      />
    </ProductCardContainerFlex>
  );
};

export default ProductCard;
