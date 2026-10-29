"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/Editorial";
import AvailabilityPanel from "@/components/forms/AvailabilityPanel";

const heroSlides = [
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008376.JPG.jpeg",
    label: "Stay somewhere worth coming home to — Mzilikazi house exterior and veranda",
    position: "center",
  },
  {
    src: "/mzilikazi imgs/Experiences/Flight of Angels/Heli-8-scaled.jpg",
    label: "Come for the Falls — Magnificent aerial view of Victoria Falls",
    position: "center",
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Lounge/NS008300.JPG.jpeg",
    label: "A comfortable base — Lobengula Suite open-plan lounge",
    position: "center",
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Kicthen/IMG_20260828_193839.jpg.jpeg",
    label: "A self-catering stay — Fully equipped modern kitchen",
    position: "center",
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Exterior/NS008374.JPG.jpeg",
    label: "A little independence — Private apartment entrance and garden walkway",
    position: "center",
  },
  {
    src: "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment2/BedRoom1/IMG_20260828_200419.jpg.jpeg",
    label: "Room to plan the days around it — Peaceful bedroom retreat",
    position: "center",
  },
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
          <div key={slide.src} data-slide={index} className={`hero-slide ${active === index ? "is-active" : ""}`}>
            <Image src={slide.src} alt={slide.label} fill
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
