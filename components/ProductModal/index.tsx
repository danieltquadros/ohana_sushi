import { Product } from '@/interfaces/Product';
import { Collapse, Flex, Modal, Tag, Typography } from 'antd';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { CartInterface } from '@/interfaces/CartInterface';
import { useAppSelector } from '@/hooks/redux';
import { cartKey } from '@/utils/cartKey';
import ObservationContentCollapse from './components/ObservationContentCollapse';
import './styles.css';
import ModalTitle from './components/ModalTitle';
import ModalFooter from './components/ModalFooter';
import Icon from '@mdi/react';
import { mdiPencilOutline } from '@mdi/js';
import useResponsive from '@/hooks/useResponsive';

interface ProductModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  product: Product;
  productQuantity?: number | null;
  onKeepCartOpen?: (open: boolean) => void;
  hideChooseButton?: boolean;
  hideControls?: boolean;
  hideKeepBuying?: boolean;
  hideSeeCart?: boolean;
}

const ProductModal = ({
  isModalOpen,
  onModalClose,
  product,
  productQuantity = null,
  onKeepCartOpen,
  hideChooseButton = false,
  hideControls = false,
  hideKeepBuying = false,
  hideSeeCart = false,
}: ProductModalProps) => {
  const cart: CartInterface | null = useAppSelector((state) => state.cart.cart);
  const currentProductInCart = cart
    ? cart.cartItemList.find((cil) => cil.id === cartKey(product)) || null
    : null;
  const { Text } = Typography;
  const { isSmDown } = useResponsive();

  const [hasItem, setHasItem] = useState(false);
  const [currentActiveKey, setCurrentActiveKey] = useState<string[]>([]);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleClose = () => {
    onModalClose();
    setCurrentActiveKey([]);
    if (onKeepCartOpen) onKeepCartOpen(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Modal
      title={<ModalTitle product={product} handleCancel={handleClose} />}
      footer={
        <ModalFooter
          product={product}
          productQuantity={productQuantity}
          hasItem={hasItem}
          onHasItem={setHasItem}
          onCurrentActiveKey={setCurrentActiveKey}
          handleClose={handleClose}
          hideChooseButton={hideChooseButton}
          hideControls={hideControls}
          hideKeepBuying={hideKeepBuying}
          hideSeeCart={hideSeeCart}
        />
      }
      closable={false}
      open={isModalOpen}
      onOk={handleClose}
      onCancel={handleClose}
      className={
        product.kind === 'COMBO' && !isSmDown
          ? 'product-modal'
          : 'vertical-product-modal'
      }
      width="fit-content"
    >
      <Flex
        gap={12}
        style={{
          padding: '0 12px',
        }}
        vertical={product.kind !== 'COMBO' || isSmDown}
      >
        {imageError ? (
          <div
            style={{
              width: 335,
              height: 335,
              background: '#f0f0f0',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            <Text style={{ fontSize: '0.8rem' }}>Imagem não disponível</Text>
          </div>
        ) : (
          <div
            style={{
              width: 335,
              height: 335,
              background: '#f0f0f0',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            <Image
              src={product.image}
              alt={product.title}
              height={335}
              width={335}
              style={{
                width: 335,
                height: 335,
                background: imageLoading ? '#f0f0f0' : '#fff',
                borderRadius: '4px',
                objectFit: 'cover',
              }}
              onError={handleImageError}
              onLoad={handleImageLoad}
              unoptimized={true}
            />
          </div>
        )}
        <Flex vertical gap={8} justify="space-between">
          <Flex vertical gap={6}>
            {product.ingredientList.length ? (
              product.ingredientList.map((ingredient) => {
                return (
                  <Text
                    key={ingredient.id}
                    style={{
                      fontSize: '0.875rem',
                      color: '#000',
                      lineHeight: 1.1,
                    }}
                  >
                    {ingredient.quantity} {ingredient.name}
                  </Text>
                );
              })
            ) : (
              <Text
                style={{
                  fontSize: '0.875rem',
                  color: '#000',
                  lineHeight: 1.1,
                }}
              >
                {product.title}
              </Text>
            )}
          </Flex>
          {hasItem ? (
            <Collapse
              ghost={true}
              activeKey={currentActiveKey}
              className="observation-collapse"
              onChange={(key) => {
                console.log('key: ', key);
                setCurrentActiveKey(key);
              }}
              items={[
                {
                  key: '1',
                  label: (
                    <Flex
                      vertical
                      style={{
                        width:
                          product.kind !== 'COMBO' || isSmDown
                            ? '311px'
                            : '224px',
                      }}
                    >
                      <Flex justify="space-between" gap={8}>
                        <Text
                          style={{
                            color: '#d81616',
                            padding: 0,
                          }}
                          ellipsis
                        >
                          {currentProductInCart?.observation?.length
                            ? 'Observação adicionada'
                            : 'Alguma observação?'}
                        </Text>
                        {currentProductInCart?.observation?.length ? (
                          <Icon
                            path={mdiPencilOutline}
                            size={0.85}
                            color="#d81616cc"
                          />
                        ) : null}
                      </Flex>
                      {!currentActiveKey.length ? (
                        <Text
                          ellipsis
                          style={{
                            color: '#777',
                          }}
                        >
                          {currentProductInCart?.observation}
                        </Text>
                      ) : null}
                    </Flex>
                  ),
                  children: (
                    <ObservationContentCollapse
                      cart={cart}
                      currentProductInCart={currentProductInCart}
                      onCurrentActiveKey={setCurrentActiveKey}
                      isActive={currentActiveKey.includes('1')}
                    />
                  ),
                },
              ]}
            />
          ) : (
            <div style={{ minWidth: '224px', height: '22px' }} />
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ProductModal;
