'use client';

import { AppBarArea, AppBarContainer, HomeButton } from './styles';
import logo from '../../public/images/newLogoB.png';
import Image from 'next/image';
import { Flex, Typography } from 'antd';
import ButtonLink from '../ButtonLink';
import Icon from '@mdi/react';
import { mdiInstagram, mdiWhatsapp } from '@mdi/js';
import useResponsive from '@/hooks/useResponsive';
import { useAppDispatch } from '@/hooks/redux';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setShowCart } from '@/store/features/cart';
import Link from 'next/link';

const AppBar = () => {
  const { isXs, isMdDown } = useResponsive();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { Text } = Typography;

  const [isInHomePage, setIsInHomePage] = useState(false);

  useEffect(() => {
    const newShowCart: boolean = pathname === '/';
    dispatch(setShowCart(newShowCart));
    setIsInHomePage(newShowCart);
  }, [pathname, dispatch]);

  return (
    <AppBarContainer
      style={{
        background: isInHomePage
          ? 'rgba(0, 0, 0, 0.85)'
          : 'rgba(0, 0, 0, 0.85)',
      }}
    >
      <AppBarArea>
        <Flex align="center" gap={isXs ? 16 : 24}>
          <Link href={'/'}>
            <HomeButton>
              <Image src={logo} width={80} height={80} alt="Ohana Sushi" />
            </HomeButton>
          </Link>
          <Flex align="center" gap={isXs ? 2 : 16}>
            <ButtonLink
              isAppLink
              icon={<Icon path={mdiWhatsapp} size={1.2} />}
              style={{ fontWeight: 600, fontSize: '1.25rem' }}
            >
              <a
                href="https://wa.me/5551996090597?text=Olá,%20estou%20vindo%20do%20site%20e%20gostaria%20de%20mais%20informações"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {isMdDown ? '' : '(51) 99609-0597'}
              </a>
            </ButtonLink>
            <ButtonLink
              isAppLink
              icon={<Icon path={mdiInstagram} size={1.2} />}
              style={{ fontWeight: 600, fontSize: '1.25rem' }}
            >
              <a
                href="https://www.instagram.com/ohanasushi_delivery"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {isMdDown ? '' : 'ohanasushi_delivery'}
              </a>
            </ButtonLink>
          </Flex>
        </Flex>
        <Flex vertical>
          {/* <Text
            style={{
              fontWeight: 600,
              color: '#d81616',
              fontSize: isXs ? '1rem' : '1.25rem',
              textAlign: 'right',
            }}
          >
            Atendimento:
          </Text> */}
          <Text
            style={{
              fontWeight: 600,
              color: '#d81616',
              fontSize: isXs ? '0.875rem' : '1.25rem',
              textAlign: 'right',
            }}
          >
            11h às 15h de Ter à Sáb
          </Text>
          <Text
            style={{
              fontWeight: 600,
              color: '#d81616',
              fontSize: isXs ? '0.875rem' : '1.25rem',
              textAlign: 'right',
            }}
          >
            18h à 0h de Ter à Dom
          </Text>
        </Flex>
      </AppBarArea>
    </AppBarContainer>
  );
};

export default AppBar;
