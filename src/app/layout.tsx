import './globals.css';

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
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${poppings.variable}`}>
        {children}
      </body>
    </html>
  );
}
