import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBookingCTA from '@/components/layout/MobileBookingCTA';
import DigitalConciergeWidget from '@/components/concierge/DigitalConciergeWidget';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-var',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-var',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-var',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | The Connected Victoria Falls Home Base`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Mzilikazi Guest Lodge in Victoria Falls, Zimbabwe. Comfortable self-catering suites, curated safaris and tours, digital concierge planning, and airport transfers.',
  keywords: [
    'Mzilikazi Guest Lodge',
    'Mzilikazi Victoria Falls',
    'Victoria Falls accommodation',
    'self-catering Victoria Falls',
    'family accommodation Victoria Falls',
    'Chobe day trip Victoria Falls',
    'corporate lodging Victoria Falls',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | The Connected Victoria Falls Home Base`,
    description:
      'We make Victoria Falls easier to experience. Spacious suites, curated safaris, and responsive local support.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Victoria Falls, Zimbabwe`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | The Connected Victoria Falls Home Base`,
    description:
      'We make Victoria Falls easier to experience. Comfortable suites, curated safaris, and responsive local support.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data — LocalBusiness + LodgingBusiness
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LodgingBusiness', 'LocalBusiness'],
      '@id': `${SITE_URL}/#lodging`,
      name: SITE_NAME,
      description:
        'The Connected Victoria Falls Home Base — Self-catering suites, safari planning, and local hospitality.',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Victoria Falls',
        addressRegion: 'Matabeleland North',
        addressCountry: 'ZW',
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Self-catering kitchen', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'High-speed Wi-Fi', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Solar power backup', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Digital Concierge', value: true },
      ],
      priceRange: '$$',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {/* Skip to content */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileBookingCTA />
        <DigitalConciergeWidget />
      </body>
    </html>
  );
}
