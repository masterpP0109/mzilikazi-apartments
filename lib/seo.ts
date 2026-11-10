import type { Metadata } from "next";
import { SITE_LOGO, SITE_NAME, SITE_URL } from "./constants";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const socialImage = {
    url: new URL(SITE_LOGO.src, SITE_URL).href,
    width: SITE_LOGO.width,
    height: SITE_LOGO.height,
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
  };
}
