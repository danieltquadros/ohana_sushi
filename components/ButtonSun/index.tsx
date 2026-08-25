import { Flex } from 'antd';
import { ButtonSunStyled, IconImageFlex, SunImageFlex } from './styles';
import Image from 'next/image';
import sun from '../../public/images/sun2.png';
import { ReactNode } from 'react';

interface ButtonSunProps {
  onClick?: () => void;
  icon?: ReactNode;
  'aria-label'?: string;
}

const ButtonSun = ({
  onClick,
  icon,
  'aria-label': ariaLabel,
}: ButtonSunProps) => {
  return (
    <ButtonSunStyled onClick={onClick} aria-label={ariaLabel}>
      <Flex vertical align="center" justify="center" style={{ height: '28px' }}>
        <SunImageFlex align="center">
          <Image src={sun} width={28} height={28} alt="" />
        </SunImageFlex>
        <IconImageFlex align="center">{icon}</IconImageFlex>
      </Flex>
    </ButtonSunStyled>
  );
};

export default ButtonSun;
