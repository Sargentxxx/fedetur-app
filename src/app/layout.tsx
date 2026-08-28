import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#002323',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'FEDETUR - Red Federal de Turismo Social y Solidario',
  description: 'Federación de Cooperativas y Mutuales de la Red Federal de Turismo Coop. Ltda. (Matrícula I.N.A.E.S. 25450). Reservas en hoteles desplegados en toda la Argentina con beneficios exclusivos para afiliados.',
  keywords: ['FEDETUR', 'Turismo Social', 'Mutuales Argentina', 'Cooperativas', 'INAES 25450', 'Hoteles Mutualistas', 'Reservas Argentina', 'Turismo Solidario'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FEDETUR',
  },
  icons: {
    icon: 'https://ss-cnt-001c.esmsv.com/r/content/host2/3696a6317d859ead6647480b66afbb18/favicon/Logo-FedeturAvigra-(7542)-32.png',
    apple: 'https://ss-cnt-001c.esmsv.com/r/content/host2/3696a6317d859ead6647480b66afbb18/favicon/Logo-FedeturAvigra-(7542)-180.png',
  },
  openGraph: {
    title: 'FEDETUR - Red Federal de Turismo Social y Solidario',
    description: 'Viajar, en busca de uno mismo. Conectamos cooperativas y mutuales con la red hotelera más federal de la Argentina.',
    url: 'https://fedetur.ar',
    siteName: 'FEDETUR Argentina',
    images: [
      {
        url: 'https://ss-cnt-001c.esmsv.com/r/content/host2/3696a6317d859ead6647480b66afbb18/img/Logo-FedeturAvigra.webp',
        width: 800,
        height: 600,
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
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-fedetur-lime selection:text-fedetur-dark">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
