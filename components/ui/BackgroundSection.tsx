"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { isPublicMedia, type PropertyMedia } from "@/lib/property";

export default function BackgroundSection({ media, className = "", children }: {
  media: PropertyMedia | null;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('story-panel--entered');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.25 });
    section.querySelectorAll('.story-panel').forEach(panel => observer.observe(panel));
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} className={`bg-section ${className}`}>
      {isPublicMedia(media) && <div className="bg-section__bg" aria-hidden="true">
        <Image src={media.src} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: media.position ?? "center" }} />
      </div>}
      <div className="bg-section__content">{children}</div>
    </section>
  );
}
