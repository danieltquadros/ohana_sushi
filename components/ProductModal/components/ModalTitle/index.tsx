import useResponsive from '@/hooks/useResponsive';
import { Product } from '@/interfaces/Product';
import calculateComboTotalItems from '@/utils/calculateComboTotalItems';
import { mdiCloseBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Flex, Tag, Typography } from 'antd';

interface ProductModalProps {
  product: Product;
  handleCancel: () => void;
}

const ModalTitle = ({ product, handleCancel }: ProductModalProps) => {
  const { Title, Text } = Typography;
  const { isMdDown } = useResponsive();

  return (
    <Flex
      gap={4}
      align="center"
      justify="space-between"
      style={{ padding: '8px 12px 0 12px' }}
    >
      <Title
        level={5}
        style={{
          margin: 0,
          fontSize: `${isMdDown ? '1.2rem' : '1.4rem'}`,
          fontFamily: 'var(--inria-sans) !important',
          fontWeight: 700,
          color: '#333',
        }}
      >
        {product.title}
      </Title>
      <Flex gap={4} align="center">
        {product.kind === 'COMBO' && (
          <Tag style={{ marginInlineEnd: '0px' }} color="#000">
            <Text
              style={{
                fontSize: '0.8rem',
                color: '#fff',
                lineHeight: 1.1,
                fontWeight: 600,
              }}
            >
              {`${calculateComboTotalItems(product.ingredientList)} peças`}
            </Text>
          </Tag>
        )}
        <Button
          onClick={handleCancel}
          icon={
            <Icon path={mdiCloseBoxOutline} size={1.175} color={'#d81616'} />
          }
          style={{
            padding: 0,
            border: 'none',
            background: 'transparent',
            boxShadow: 'none',
            width: 'fit-content',
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ModalTitle;
