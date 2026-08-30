import { Flex } from 'antd';
import { ErrorMessage, StyledInput, InputLabel } from './styles';
import { ChangeEventHandler, ReactNode, useId } from 'react';

interface InputFormProps {
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
  containerWidth?: string;
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
}

const InputForm = ({
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
  containerWidth = '100%',
  containerProps = {},
  labelProps = {},
  errorMessageProps = {},
  suffix,
  redStyled = false,
  allowClear,
}: InputFormProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hasError = showErrorMessage && !!errorMessage;

  return (
    <Flex vertical style={{ width: containerWidth }} {...containerProps}>
      <InputLabel htmlFor={inputId} {...labelProps}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </InputLabel>
      <StyledInput
        id={inputId}
        aria-required={required || undefined}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        size="large"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        suffix={suffix}
        redStyled={redStyled}
        allowClear={allowClear}
        {...props}
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

export default InputForm;
