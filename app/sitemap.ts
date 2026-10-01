import { guideArticles, itineraries } from "@/lib/planning";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { publishedAccommodations, experiences } from "@/lib/property";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/apartments",
    "/experiences",
    "/victoria-falls",
    "/faq",
    "/plan",
    "/our-story",
    ...guideArticles.map((a) => "/victoria-falls/" + a.slug),
    ...itineraries.map((i) => "/plan/itineraries/" + i.id),
    "/contact",
    "/family-group-accommodation-victoria-falls",
    "/corporate-stays-victoria-falls",
    ...publishedAccommodations.map((a) => "/apartments/" + a.slug),
    ...experiences
      .filter((e) => e.enabled)
      .map((e) => "/experiences/" + e.slug),
  ];
  return paths.map((path) => ({
    url: SITE_URL + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
