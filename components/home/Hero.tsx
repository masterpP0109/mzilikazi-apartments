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
    "Hello Mzilikazi Apartments, I'd like to check availability and rates for a stay in Victoria Falls.",
  );

  return (
    <section id="hero" className="hero hero-home">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-slide is-active">
          <Image
            src={HERO_IMAGE}
            alt={HERO_ALT}
            fill
            priority
            sizes="100vw"
            className="hero-bg-img"
          />
        </div>
      </div>

      <Container>
        <div className="hero-top has-image">
          <div className="hero-copy-block">
            <Eyebrow>Victoria Falls · Zimbabwe</Eyebrow>
            <h1 className="hero-heading">
              Come for the Falls.
              <br />
              <em>Stay somewhere worth coming home to.</em>
            </h1>
            <p className="hero-copy">
              Two-bedroom self-catering apartments for up to four guests. From
              US$130 per apartment per night.
            </p>
            <div className="actions hero-actions">
              <Link className="button button-primary" href="/contact">
                Request Availability
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
