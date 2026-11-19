"use client";
import Link from "next/link";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/Editorial";
import { whatsappUrl } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const HERO_IMAGE =
  "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Lounge/NS008300.JPG.jpeg";
const HERO_ALT =
  "Mzilikazi Apartments — open-plan lounge with L-shaped sofa, giraffe cushions, coffee table and sunlit curtains";

export default function Hero() {
  const whatsapp = whatsappUrl(
    "Hello Mzilikazi Apartments, I'd like to request availability and rates for a stay in Victoria Falls.",
  );

  return (
    <section id="hero" className="hero hero-home">
      <div className="hero-mobile-media">
        <Image
          src={HERO_IMAGE}
          alt={HERO_ALT}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "60% 58%" }}
        />
      </div>

      <div className="hero-background" aria-hidden="true">
        <div className="hero-slide is-active">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 100vw, 1px"
            style={{ objectFit: "cover", objectPosition: "62% 58%" }}
          />
        </div>
      </div>

      <Container>
        <div className="hero-top has-image">
          <div className="hero-copy-block">
            <Eyebrow>Victoria Falls · Zimbabwe</Eyebrow>
            <h1 className="hero-heading">
              <span className="hero-title-mobile">
                Your Victoria Falls home base.
              </span>
              <span className="hero-title-desktop">
                Come for the Falls.
                <br />
                <em>Stay somewhere worth coming home to.</em>
              </span>
            </h1>
            <p className="hero-copy">
              Two-bedroom self-catering apartments for up to four guests. From
              US$130 per apartment per night.
            </p>
            <div className="actions hero-actions">
              <Link className="button button-primary" href="/contact">
                Check Availability
              </Link>
              <Link className="button button-secondary" href="/apartments">
                View Apartments
              </Link>
            </div>
            {whatsapp && (
              <p className="hero-whatsapp-note">
                Prefer WhatsApp?{" "}
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", { location: "hero" })
                  }
                >
                  Message our team
                </a>
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
