import ChooseButton from '@/components/ChooseButton';
import useResponsive from '@/hooks/useResponsive';
import { Product } from '@/interfaces/Product';
import { Button, Collapse, CollapseProps, Flex, Typography } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import clsx from 'clsx';
import './styles.css';
import { useAppDispatch } from '@/hooks/redux';
import { setOpenCart } from '@/store/features/controls';

interface ModalFooterProps {
  product: Product;
  productQuantity?: number | null;
  hasItem: boolean;
  onHasItem: Dispatch<SetStateAction<boolean>>;
  onCurrentActiveKey: Dispatch<SetStateAction<string[]>>;
  handleClose: () => void;
  hideControls: boolean;
  hideKeepBuying: boolean;
  hideSeeCart: boolean;
  hideChooseButton?: boolean;
}

const ModalFooter = ({
  product,
  productQuantity = null,
  hasItem,
  onHasItem,
  onCurrentActiveKey,
  handleClose,
  hideControls,
  hideKeepBuying,
  hideSeeCart,
  hideChooseButton = false,
}: ModalFooterProps) => {
  const { isSmDown } = useResponsive();
  const { Title } = Typography;
  const dispatch = useAppDispatch();

  const [activeKey, setActiveKey] = useState<string[]>([]);

  const handleSeeCart = () => {
    dispatch(setOpenCart(true));
    handleClose();
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: null,
      children: !hideControls && (!hideKeepBuying || !hideSeeCart) && (
        <Flex gap={0}>
          {!hideKeepBuying && (
            <Button
              className={clsx(
                'action-button',
                'keep-buying-button',
                hideSeeCart ? 'unique-button' : '',
              )}
              style={{
                borderRadius: hideSeeCart ? '4px 0 0 4px !important' : '',
              }}
              onClick={handleClose}
            >
              Continuar comprando
            </Button>
          )}
          {!hideSeeCart && (
            <Button
              className={clsx('action-button', 'see-cart-button')}
              onClick={handleSeeCart}
            >
              Ver carrinho
            </Button>
          )}
        </Flex>
      ),
      showArrow: false,
    },
  ];

  useEffect(() => {
    if (hasItem && !hideControls && (!hideKeepBuying || !hideSeeCart)) {
      setActiveKey(['1']);
    } else {
      setActiveKey([]);
    }
  }, [hasItem]);

  return (
    <Flex vertical>
      <Flex
        justify="space-between"
        align="center"
        style={{
          background: '#000',
          height: '42px',
          padding: '0 12px',
          borderRadius:
            (hasItem && !hideControls && product.kind !== 'COMBO') ||
            (isSmDown && hasItem && !hideControls)
              ? '0'
              : '0 0 4px 4px',
          overflow: 'hidden',
        }}
        gap={8}
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
            padding: '8px 0',
          }}
        >
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.price)}
        </Title>
        {activeKey.length > 0 && product.kind === 'COMBO' && !isSmDown
          ? !hideControls && (
              <Flex gap={0} style={{ height: '42px' }} align="center">
                {!hideKeepBuying && (
                  <Button
                    className={clsx(
                      'action-button-bar',
                      'keep-buying-button-bar',
                      hideSeeCart ? 'unique-button-bar' : '',
                    )}
                    onClick={handleClose}
                  >
                    Continuar comprando
                  </Button>
                )}
                {!hideSeeCart && (
                  <Button
                    className={clsx(
                      'action-button-bar',
                      'see-cart-button-bar',
                      hideKeepBuying ? 'unique-button-bar' : '',
                    )}
                    onClick={handleSeeCart}
                  >
                    Ver carrinho
                  </Button>
                )}
              </Flex>
            )
          : null}
        {!hideChooseButton ? (
          <ChooseButton
            product={product}
            sunButton
            hasItem={hasItem}
            onHasItem={onHasItem}
            onCurrentActiveKey={onCurrentActiveKey}
          />
        ) : productQuantity ? (
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
              padding: '8px 0',
            }}
          >
            x{productQuantity}
          </Title>
        ) : null}
      </Flex>
      {(product.kind !== 'COMBO' || isSmDown) && !hideControls && (
        <Collapse
          items={items}
          activeKey={activeKey}
          className="control-collapse"
        />
      )}
    </Flex>
  );
};

export default ModalFooter;
