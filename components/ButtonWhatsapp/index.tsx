import { Flex } from 'antd';
import { IoLogoWhatsapp } from 'react-icons/io';
import { ButtonWhatsappStyled } from './styles';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ButtonWhatsappProps {
  whatsappLogo?: ReactNode;
  whatsappText?: string;
  whatsappNumber: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  childrenContainerWidth?: string;
  releaseRedirection?: boolean;
  onButtonClick?: Dispatch<SetStateAction<boolean>>;
}

const ButtonWhatsapp = ({
  whatsappLogo = <IoLogoWhatsapp style={{ width: '26px', height: '26px' }} />,
  whatsappText,
  whatsappNumber,
  children = 'Whatsapp',
  style,
  childrenContainerWidth = '180px',
  releaseRedirection = true,
  onButtonClick,
}: ButtonWhatsappProps) => {
  const handleRedirection = () => {
    if (onButtonClick) {
      onButtonClick(true);
    }
    if (releaseRedirection) {
      const whatsappLink = `https://wa.me/55${whatsappNumber}?text=${whatsappText}`;
      window.open(whatsappLink, '_blank');
    }
  };

  return (
    <ButtonWhatsappStyled style={style} onClick={handleRedirection}>
      <Flex
        align="center"
        justify="center"
        gap={8}
        style={{
          width: `${childrenContainerWidth}`,
          background: '#00BB2D',
          padding: 'none',
          borderRadius: '11px',
          height: '44px',
          border: '2px solid #FFF',
        }}
      >
        {whatsappLogo}
        <span
          style={{
            color: 'inherit',
            textDecoration: 'none',
            fontSize: '22px',
            fontWeight: 600,
            paddingBottom: '2px',
            cursor: 'pointer',
          }}
        >
          {children}
        </span>
      </Flex>
    </ButtonWhatsappStyled>
  );
};

export default ButtonWhatsapp;
