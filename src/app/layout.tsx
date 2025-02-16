import './globals.css';

import { QueryProvider } from '@/config/query';
import { Toast } from '@/config/toast';
import { Modal } from '@/store/modal/Modal';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const poppings = Poppins({
  variable: '--font-poppings',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eagles System',
  description: 'Eagles System',
  other: {
    google: 'notranslate',
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="pt-BR" translate="no">
      <body className={`${inter.variable} ${poppings.variable}`}>
        <QueryProvider>
          {children}
          <Modal />
        </QueryProvider>

        <Toast />
      </body>
    </html>
  );
}
