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
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 65vw",
}: {
  media: PropertyMedia | null;
  ratio?: "landscape" | "portrait" | "wide" | "square" | "hero";
  priority?: boolean;
  sizes?: string;
}) {
  if (!isPublicMedia(media)) return null;
  return (
    <div className={`image-frame ratio-${ratio}`}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
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
  media = null,
  mediaRatio = "wide",
  actions,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  media?: PropertyMedia | null;
  mediaRatio?: "landscape" | "portrait" | "wide" | "square" | "hero";
  actions?: React.ReactNode;
}) {
  if (isPublicMedia(media)) {
    return (
      <section className="hero page-hero">
        <div className="hero-background" aria-hidden="true">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: media.position ?? "center",
            }}
          />
        </div>
        <Container>
          <div className="hero-top has-image page-hero-content">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1>{title}</h1>
              {children && <div className="intro-copy hero-copy">{children}</div>}
              {actions && <div className="actions" style={{ marginTop: 24 }}>{actions}</div>}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="page-intro">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {children && <div className="intro-copy">{children}</div>}
        {actions && <div className="actions" style={{ marginTop: 24 }}>{actions}</div>}
      </Container>
    </section>
  );
}
