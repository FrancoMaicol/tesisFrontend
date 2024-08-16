import './globals.scss';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Kanan',
  description: '',
}
type RootLayoutProps = { children: React.ReactNode }
export default function RootLayout({ children } : RootLayoutProps) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
