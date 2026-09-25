import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingCTA from "@/components/layout/MobileBookingCTA";
import { SITE_NAME, SITE_URL, SITE_TAGLINE } from "@/lib/constants";
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: `${SITE_NAME}, Victoria Falls, Zimbabwe. ${SITE_TAGLINE}`,
  openGraph: {
    type: "website",
    locale: "en_ZW",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
  twitter: { card: "summary", title: SITE_NAME, description: SITE_TAGLINE },
  robots: { index: true, follow: true },
};
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria Falls",
    addressCountry: "ZW",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)});`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileBookingCTA />
      </body>
    </html>
  );
}
