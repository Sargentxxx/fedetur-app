import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#003561',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'FEDETUR · Portal Federal de Turismo Social y Solidario Argentino',
  description: 'Federación de Cooperativas y Mutuales de la Red Federal de Turismo Coop. Ltda. (Matrícula I.N.A.E.S. 25450). Conectando a más de 30 millones de asociados con hotelería de excelencia y tarifas bonificadas en las 24 provincias.',
  keywords: ['FEDETUR', 'Turismo Social', 'Mutuales Argentina', 'Cooperativas', 'INAES 25450', 'Hoteles Mutualistas', 'Reservas Argentina', 'Turismo Solidario', 'Red Federal'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FEDETUR',
  },
  icons: {
    icon: '/images/logo-fedetur.png',
    apple: '/images/logo-fedetur.png',
  },
  openGraph: {
    title: 'FEDETUR · Red Federal de Turismo Social y Solidario',
    description: 'Viajar, en busca de uno mismo y de nuestra tierra. Articulando mutuales, cooperativas y complejos turísticos en toda la Argentina.',
    url: 'https://fedetur.ar',
    siteName: 'FEDETUR Argentina',
    images: [
      {
        url: '/images/logo-fedetur.png',
        width: 922,
        height: 266,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth h-full">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-fedetur-sky selection:text-fedetur-primary">
        <Navbar />
        <div className="flex-1 w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
