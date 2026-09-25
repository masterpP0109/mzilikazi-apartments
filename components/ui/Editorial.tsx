import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { isPublicMedia, type PropertyMedia } from "@/lib/property";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function ImageFrame({
  media,
  ratio = "landscape",
  priority = false,
}: {
  media: PropertyMedia | null;
  ratio?: "landscape" | "portrait" | "wide" | "square" | "hero";
  priority?: boolean;
}) {
  if (!isPublicMedia(media)) return null;
  return (
    <div className={`image-frame ratio-${ratio}`}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 65vw"
        preload={priority}
        style={{ objectPosition: media.position ?? "center" }}
      />
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {children && <div className="intro-copy">{children}</div>}
      </Container>
    </section>
  );
}
