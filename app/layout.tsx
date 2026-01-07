import React from 'react';
import type { Metadata } from 'next';
import { Kaushan_Script, Inria_Sans, Montserrat } from 'next/font/google';
import './globals.css';
import ReduxAndAppProvider from '@/providers/ReduxAndAppProvider';
import { Flex } from 'antd';
import Icon from '@mdi/react';
import { mdiWhatsapp } from '@mdi/js';

const kaushanScript = Kaushan_Script({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--kaushan-script',
});
const inriaSans = Inria_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
  variable: '--inria-sans',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--montserrat',
});

export const metadata: Metadata = {
  title: 'Ohana Sushi Delivery',
  description: 'Ohana Sushi - Delivery de Comida Japonesa',
  icons: {
    icon: '/images/newLogoB.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${kaushanScript.variable} ${inriaSans.variable} ${montserrat.variable}`}
        suppressHydrationWarning={true}
      >
        <ReduxAndAppProvider>
          <Flex vertical justify="space-between" style={{ minHeight: '100vh' }}>
            <Flex vertical>{children}</Flex>
            <Flex
              justify="center"
              align="center"
              gap={16}
              style={{
                height: '64px',
                background: '#E1E1E1',
                borderTop: '1px solid #d81616aa',
              }}
            >
              <Flex gap={4} align="center">
                <Icon path={mdiWhatsapp} size={0.7} />
                <span>(51) 99609-0597</span>
              </Flex>
              <span>-</span>
              <span>@ohanasushi_delivery</span>
            </Flex>
          </Flex>
        </ReduxAndAppProvider>
      </body>
    </html>
  );
}
