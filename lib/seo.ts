import type { Metadata } from "next";
import { SITE_NAME } from "./constants";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
    },
    twitter: { card: "summary", title: `${title} | ${SITE_NAME}`, description },
  };
}
