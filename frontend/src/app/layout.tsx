import { Metadata } from 'next';
import { ReactNode } from 'react';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Openlog Admin',
  description: 'Web interface for Openlog',
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
