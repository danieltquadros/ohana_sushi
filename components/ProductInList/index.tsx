import ChooseButton from '@/components/ChooseButton';
import ProductModal from '@/components/ProductModal';
import { CartItemList } from '@/interfaces/CartItemList';
import calculateComboTotalItems from '@/utils/calculateComboTotalItems';
import { Col, Flex, Row, Typography } from 'antd';
import Image from 'next/image';
import { FlexContentList } from './styles';
import { Dispatch, SetStateAction, useState } from 'react';

interface ContentListProps {
  item: CartItemList;
  onOpenCart?: (open: boolean) => void;
  hideControls?: boolean;
  hideChooseButtonInProductModal?: boolean;
  showQuantity?: boolean;
  hideControlsInProductModal?: boolean;
  hideKeepBuyingInProductModal?: boolean;
  hideSeeCartInProductModal?: boolean;
}

const ProductInList = ({
  item,
  onOpenCart,
  hideControls = false,
  hideChooseButtonInProductModal = false,
  showQuantity = false,
  hideControlsInProductModal,
  hideKeepBuyingInProductModal,
  hideSeeCartInProductModal,
}: ContentListProps) => {
  const { Text } = Typography;

  const [openProductModal, setOpenProductModal] = useState(false);

  return (
    <FlexContentList justify="space-between" gap={4} key={item.id}>
      <Row align="middle" style={{ width: '100%' }} wrap={false}>
        <Col
          flex="48px"
          style={{ cursor: 'pointer' }}
          onClick={() => setOpenProductModal(true)}
        >
          <Image
            src={item.product.image}
            alt="example"
            height={48}
            width={48}
          />
        </Col>
        <Col
          flex="auto"
          style={{ cursor: 'pointer' }}
          onClick={() => setOpenProductModal(true)}
        >
          <Flex vertical style={{ padding: '0 4px' }}>
            <Text
              style={{
                fontWeight: 600,
                lineHeight: 1.1,
                wordBreak: 'break-word',
              }}
            >
              {item.product.title}
            </Text>
            {item.product.kind === 'COMBO' ? (
              <Text
                style={{
                  lineHeight: 1.1,
                  fontSize: '12.8px',
                }}
              >
                {`${calculateComboTotalItems(item.product.ingredientList)} peças`}{' '}
                -{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.product.price)}
              </Text>
            ) : (
              <Text
                style={{
                  lineHeight: 1.1,
                  fontSize: '12.8px',
                }}
              >
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.product.price)}
              </Text>
            )}
            {item.observation && item?.observation.length ? (
              <Text
                ellipsis
                style={{
                  color: '#777',
                }}
              >
                {item?.observation}
              </Text>
            ) : null}
          </Flex>
        </Col>
        {!hideControls && (
          <Col flex="92px">
            <ChooseButton product={item.product} />
          </Col>
        )}
        {showQuantity && (
          <Col flex="48px" style={{ textAlign: 'center' }}>
            <Text>x{item.quantity}</Text>
          </Col>
        )}
        <Col
          flex="80px"
          style={{
            textAlign: 'end',
            alignContent: 'center',
            cursor: 'pointer',
            height: '100%',
          }}
          onClick={() => setOpenProductModal(true)}
        >
          <Text onClick={() => setOpenProductModal(true)}>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(item.product.price * item.quantity)}
          </Text>
        </Col>
      </Row>
      <ProductModal
        isModalOpen={openProductModal}
        onModalClose={() => setOpenProductModal(false)}
        product={item.product}
        productQuantity={item.quantity}
        onKeepCartOpen={onOpenCart}
        hideChooseButton={hideChooseButtonInProductModal}
        hideControls={hideControlsInProductModal}
        hideKeepBuying={hideKeepBuyingInProductModal}
        hideSeeCart={hideSeeCartInProductModal}
      />
    </FlexContentList>
  );
};

export default ProductInList;
