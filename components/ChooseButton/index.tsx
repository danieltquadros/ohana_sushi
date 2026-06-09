'use client';

import { v4 as uuidv4 } from 'uuid';

import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { Product } from '@/interfaces/Product';
import { CartItemList } from '@/interfaces/CartItemList';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CartInterface } from '@/interfaces/CartInterface';
import { setCart } from '@/store/features/cart';
import { cartKey } from '@/utils/cartKey';
import { Flex, Typography } from 'antd';
import Icon from '@mdi/react';
import { mdiMinusThick, mdiPlusThick } from '@mdi/js';
import RemoveItemModal from '../RemoveItemModal';
import ButtonSun from '../ButtonSun';
import { DefaultButton } from './styles';

interface ChooseButtonProps {
  product: Product;
  activeAlert?: boolean;
  sunButton?: boolean;
  hasItem?: boolean;
  onHasItem?: Dispatch<SetStateAction<boolean>>;
  onCurrentActiveKey?: Dispatch<SetStateAction<string[]>>;
}

const ChooseButton = ({
  product,
  activeAlert = false,
  sunButton,
  hasItem = false,
  onHasItem = () => {},
  onCurrentActiveKey,
}: ChooseButtonProps) => {
  const dispatch = useAppDispatch();
  const { Text } = Typography;
  const cart: CartInterface | null = useAppSelector((state) => state.cart.cart);

  const [quantityItem, setQuantityItem] = useState<number>(0);
  const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = useState(false);

  const handleSubtractItem = () => {
    if (activeAlert && quantityItem === 1) {
      setIsRemoveItemModalOpen(true);
      return;
    }

    if (quantityItem === 1 && onCurrentActiveKey) {
      onCurrentActiveKey([]);
    }
    if (quantityItem > 0 && cart) {
      setQuantityItem(quantityItem - 1);
      const key = cartKey(product);
      const newCartItem = cart.cartItemList
        .map((cil) => {
          if (cil.id === key) {
            return {
              ...cil,
              quantity: cil.quantity - 1,
            };
          }
          return cil;
        })
        .filter((item) => item.quantity > 0);

      const newCart: CartInterface = {
        ...cart,
        value: cart.value - product.price,
        cartItemList: newCartItem,
      };

      dispatch(setCart(newCart));
    }
  };

  const handleAddItem = () => {
    const key = cartKey(product);
    if (cart) {
      const item =
        cart.cartItemList.find((cil) => cil.id === key) || null;
      if (item) {
        setQuantityItem(quantityItem + 1);
        const newCartItem = cart.cartItemList.map((cil) => {
          if (cil.id === item.id) {
            return {
              ...cil,
              quantity: cil.quantity + 1,
            };
          }
          return cil;
        });

        const newCart: CartInterface = {
          ...cart,
          value: cart.value + product.price,
          cartItemList: newCartItem,
        };

        dispatch(setCart(newCart));
      } else {
        setQuantityItem(1);
        const newCartItemList: CartItemList[] = [
          ...cart.cartItemList,
          {
            id: key,
            product,
            quantity: 1,
          },
        ];

        const newCart: CartInterface = {
          ...cart,
          value: cart.value + product.price,
          cartItemList: newCartItemList,
        };

        dispatch(setCart(newCart));
      }
    } else {
      setQuantityItem(1);
      const newCartItemList: CartItemList = {
        id: key,
        product,
        quantity: 1,
      };

      const newCart: CartInterface = {
        id: uuidv4(),
        value: product.price,
        deliveryCost: 0,
        cartItemList: [newCartItemList],
      };

      dispatch(setCart(newCart));
    }
  };

  useEffect(() => {
    if (cart) {
      const key = cartKey(product);
      const newQuantityItem =
        cart.cartItemList.find((cartItem) => cartItem.id === key)
          ?.quantity || 0;
      setQuantityItem(newQuantityItem);
      onHasItem(newQuantityItem > 0);
    }
  }, [cart]);

  return (
    <Flex align="center">
      {quantityItem > 0 && (
        <>
          {sunButton ? (
            <ButtonSun
              onClick={handleSubtractItem}
              icon={<Icon path={mdiMinusThick} size={0.7} color={'#FFF'} />}
            />
          ) : (
            <DefaultButton onClick={handleSubtractItem}>
              <Icon path={mdiMinusThick} size={0.7} color={'#FFF'} />
            </DefaultButton>
          )}
          <Flex
            align="center"
            justify="center"
            style={{ width: '28px', margin: '0 4px' }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: sunButton ? '1.1rem' : '0.9rem',
                color: sunButton ? '#FFF' : '#000',
              }}
            >
              {quantityItem}
            </Text>
          </Flex>
        </>
      )}
      {sunButton ? (
        <ButtonSun
          onClick={handleAddItem}
          icon={<Icon path={mdiPlusThick} size={0.7} color={'#FFF'} />}
        />
      ) : (
        <DefaultButton onClick={handleAddItem}>
          <Icon path={mdiPlusThick} size={0.7} color={'#FFF'} />
        </DefaultButton>
      )}
      <RemoveItemModal
        item={
          cart?.cartItemList.find((cil) => cil.id === cartKey(product)) || null
        }
        isRemoveItemModalOpen={isRemoveItemModalOpen}
        onIsRemoveItemModalOpen={setIsRemoveItemModalOpen}
      />
    </Flex>
  );
};

export default ChooseButton;
