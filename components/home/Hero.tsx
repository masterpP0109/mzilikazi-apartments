"use client";
import Link from "next/link";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/Editorial";
import AvailabilityPanel from "@/components/forms/AvailabilityPanel";
import { whatsappUrl } from "@/lib/constants";

const HERO_IMAGE = "/mzilikazi imgs/mzilikazi-img/mzilikazi images/Apartment1/Lounge/NS008300.JPG.jpeg";

export default function Hero() {
  const whatsapp = whatsappUrl(
    "Hello, I'm interested in accommodation at Mzilikazi Apartments. Could you please assist me with availability and rates?",
  );

  return (
    <section id="hero" className="hero">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-slide is-active">
          <Image
            src={HERO_IMAGE}
            alt="Mzilikazi Apartments — comfortable open-plan lounge with contemporary sofa and warm natural lighting"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
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
              Two-bedroom apartments in Victoria Falls designed for couples,
              families and friends who want space, privacy and a comfortable
              base for exploring the Falls at their own pace.
            </p>
            <ul className="hero-feature-list" aria-label="Property highlights">
              <li>Two-bedroom apartments</li>
              <li>Up to four guests per apartment</li>
              <li>Self-catering facilities</li>
              <li>High-speed Wi-Fi</li>
              <li>From US$130 per apartment per night</li>
            </ul>
            <div className="actions">
              <Link className="button button-primary" href="/apartments">
                View Apartments
              </Link>
              <Link className="button button-secondary" href="/contact">
                Enquire About Availability
              </Link>
              {whatsapp && (
                <a className="button button-secondary" href={whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp us
                </a>
              )}
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
