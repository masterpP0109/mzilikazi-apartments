import type { Metadata } from "next";
import { SITE_OG_IMAGE, SITE_NAME, SITE_URL } from "./constants";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const socialImage = {
    url: new URL(SITE_OG_IMAGE.src, SITE_URL).href,
    width: SITE_OG_IMAGE.width,
    height: SITE_OG_IMAGE.height,
    alt: SITE_NAME,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [socialImage],
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}
