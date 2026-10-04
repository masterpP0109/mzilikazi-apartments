"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/Editorial";
import AvailabilityPanel from "@/components/forms/AvailabilityPanel";

const heroSlides = [
  { file: "WhatsApp Image 2026-10-02 at 2.41.38 PM (1).jpeg", label: "Covered courtyard", position: "60% center" },
  { file: "WhatsApp Image 2026-10-02 at 2.41.28 PM.jpeg", label: "Open-plan lounge", position: "center" },
  { file: "WhatsApp Image 2026-10-02 at 2.41.30 PM (3).jpeg", label: "Bedroom", position: "45% center" },
  { file: "WhatsApp Image 2026-10-02 at 2.41.30 PM.jpeg", label: "Kitchen and dining space", position: "center" },
  { file: "WhatsApp Image 2026-10-02 at 2.41.42 PM (1).jpeg", label: "Garden patio", position: "center" },
];
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [requested, setRequested] = useState(0);
  const [visited, setVisited] = useState([0]);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(query.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();
    query.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      query.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);
  useEffect(() => {
    if (paused || interacting || focused || reduced !== false || !visible || active !== requested) return;
    const timer = window.setTimeout(() => {
      const next = (active + 1) % heroSlides.length;
      setVisited(previous => previous.includes(next) ? previous : [...previous, next]);
      setRequested(next);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [active, requested, paused, interacting, focused, reduced, visible]);
  useEffect(() => {
    const image = section.current?.querySelector<HTMLImageElement>(".hero-slide[data-slide=\"" + requested + "\"] img");
    if (image?.complete && image.naturalWidth > 0) setActive(requested);
  }, [requested]);
  return (
    <section ref={section} id="hero" className="hero" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="hero-background" aria-hidden="true">
        {heroSlides.map((slide, index) => visited.includes(index) && (
          <div key={slide.file} data-slide={index} className={`hero-slide ${active === index ? "is-active" : ""}`}>
            <Image src={"/mzilikazi imgs/mzilikazi-img/hero/" + slide.file} alt="" fill
              preload={index === 0} loading={index === 0 ? undefined : "eager"} sizes="100vw"
              style={{ objectFit: "cover", objectPosition: slide.position }}
              onLoad={() => { if (requested === index) setActive(index); }}
              onError={() => { setRequested(active); setPaused(true); }} />
          </div>
        ))}
      </div>
      <Container>
        <div className="hero-top has-image">
          <div>
            <Eyebrow>Victoria Falls · Zimbabwe</Eyebrow>
            <h1>
              Come for the Falls.
              <br />
              <em>Stay somewhere worth coming home to.</em>
            </h1>
            <p className="hero-copy">
              A comfortable base. A little independence.
              <br />A self-catering stay, with room to plan the days around it.
            </p>
            <div className="actions">
              <Link className="button button-primary" href="/apartments">
                Explore the Stay
              </Link>
              <Link className="text-link" href="/plan">
                Plan My Victoria Falls Trip →
              </Link>
            </div>
          </div>
        </div>
        <AvailabilityPanel />
        <div className="hero-footnote">
          <span>Your stay starts here.</span>
          <a href="#apartments" className="text-link">
            Settle in <span aria-hidden="true">↓</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
