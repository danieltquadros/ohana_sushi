import { Input, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

interface StyledInputProps {
  redStyled?: boolean;
}

export const StyledInput = styled(Input)<StyledInputProps>`
  border-radius: 4px;
  border-color: ${(props) => (props.redStyled ? '#d8161660' : '#33333360')};
  font-family: var(--montserrat), sans-serif;

  &:hover {
    border-color: ${(props) =>
      props.redStyled ? '#d81616 !important' : '#000 !important'};
    box-shadow: 1.5px 1.5px 4px
      ${(props) =>
        props.redStyled ? '#d8161620 !important' : '#33333320 !important'};
  }

  &:focus-within {
    border-color: ${(props) => (props.redStyled ? '#d8161660' : '#33333360')};
    box-shadow: none !important;
  }
`;

export const InputLabel = styled.label`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
`;

export const ErrorMessage = styled(Text)`
  color: red;
  font-size: 0.75rem;
`;
