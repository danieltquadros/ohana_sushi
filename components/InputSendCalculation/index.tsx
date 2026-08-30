import { Flex } from 'antd';
import {
  ChangeEventHandler,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useId,
} from 'react';
import { ErrorMessage, StyledSelect, InputLabel } from './styles';
import deliveryCostList from './mock';
import { AddressProps } from '@/interfaces/AddressForm';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCart } from '@/store/features/cart';
import { CartInterface } from '@/interfaces/CartInterface';
import { setNeighborhood } from '@/store/features/neighborhood';
import { DeliveryCost } from '@/interfaces/DeliveryCost';

interface InputSendCalculationProps {
  label?: string;
  id?: string;
  value?: string | number;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
  showErrorMessage?: boolean;
  props?: {};
  containerProps?: {};
  labelProps?: {};
  errorMessageProps?: {};
  suffix?: ReactNode;
  redStyled?: boolean;
  allowClear?:
    | boolean
    | {
        clearIcon?: ReactNode;
      }
    | undefined;
  addressForm?: AddressProps;
  onAddressForm?: (addressForm: AddressProps) => void;
}

const InputSendCalculation = ({
  label,
  id,
  value,
  required = false,
  maxLength,
  placeholder,
  onChange,
  errorMessage = '',
  showErrorMessage = false,
  props = {},
  containerProps = {},
  labelProps = {},
  errorMessageProps = {},
  suffix,
  redStyled = false,
  allowClear,
  addressForm,
  onAddressForm,
  // setCurrentDeliveryCost,
}: InputSendCalculationProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hasError = showErrorMessage && !!errorMessage;
  const cart: CartInterface | null = useAppSelector((state) => state.cart.cart);
  const deliveryCost: DeliveryCost | null = useAppSelector(
    (state) => state.neighborhood.neighborhood,
  );
  const dispatch = useAppDispatch();

  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const handleNeighborhood = (value: any) => {
    const newNeighborhood = deliveryCostList.find(
      (deliveryCostList) => deliveryCostList.id === value,
    );

    dispatch(setNeighborhood(newNeighborhood || null));

    if (addressForm && onAddressForm) {
      onAddressForm({
        ...addressForm,
        neighborhood: newNeighborhood?.name || '',
      });
    }
  };

  const handleClearNeighborhood = () => {
    const newCart: CartInterface = {
      id: cart?.id || '',
      value: cart?.value || 0,
      deliveryCost: 0,
      cartItemList: cart?.cartItemList || [],
    };

    dispatch(setCart(newCart));
  };

  useEffect(() => {
    if (addressForm?.neighborhood) {
      const newDeliveryCost = deliveryCostList.find(
        (deliveryCostList) =>
          deliveryCostList.name === addressForm?.neighborhood,
      );

      if (addressForm && onAddressForm) {
        onAddressForm({
          ...addressForm,
          deliveryCost: newDeliveryCost?.deliveryCost || 0,
        });
      }
      const newCart: CartInterface = {
        id: cart?.id || '',
        value: cart?.value || 0,
        deliveryCost: newDeliveryCost?.deliveryCost || 0,
        cartItemList: cart?.cartItemList || [],
      };

      dispatch(setCart(newCart));
      handleNeighborhood(newDeliveryCost?.id || '');
    }
  }, [addressForm?.neighborhood, addressForm?.zipCode]);

  return (
    <Flex vertical style={{ width: '100%' }} {...containerProps}>
      <InputLabel htmlFor={inputId} {...labelProps}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </InputLabel>
      <StyledSelect
        id={inputId}
        aria-required={required || undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        showSearch
        allowClear
        placeholder="Selecione um bairro"
        optionFilterProp="label"
        onChange={handleNeighborhood}
        onClear={handleClearNeighborhood}
        value={deliveryCost?.id || ''}
        filterOption={(input, option) => {
          const normalizedInput = normalizeString(input);
          const normalizedOption = normalizeString(
            option?.label?.toString() || '',
          );
          return normalizedOption.includes(normalizedInput);
        }}
        options={deliveryCostList
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => ({
            value: item.id,
            label: item.name,
          }))}
      />
      {hasError ? (
        <ErrorMessage id={errorId} {...errorMessageProps}>
          {errorMessage}
        </ErrorMessage>
      ) : errorMessage ? (
        <span style={{ width: '100%', height: '18.84px' }} />
      ) : null}
    </Flex>
  );
};

export default InputSendCalculation;
