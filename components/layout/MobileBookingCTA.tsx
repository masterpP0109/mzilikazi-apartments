"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { whatsappUrl } from "@/lib/constants";
export default function MobileBookingCTA() {
  const [visible, setVisible] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      const footer = document.getElementById("site-footer");
      const form = document.querySelector("main [data-enquiry]");
      const inView = (el: Element | null) => {
        const r = el?.getBoundingClientRect();
        return r && r.top < innerHeight && r.bottom > 0;
      };
      setVisible(
        path !== "/contact" &&
          !document.querySelector("dialog[open]") &&
          !document.querySelector('[data-menu-open="true"]') &&
          !inView(footer) &&
          !inView(form) &&
          (hero
            ? hero.getBoundingClientRect().bottom < 0
            : scrollY > innerHeight * 0.6),
      );
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    const observer = new MutationObserver(update);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open", "data-menu-open"],
    });
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [path]);
  if (!visible) return null;
  const whatsapp = whatsappUrl();
  return (
    <aside className="mobile-booking" aria-label="Enquire about your stay">
      <Link href="/contact" className="button button-primary">
        Check availability
      </Link>
      {whatsapp && (
        <a className="icon-button" href={whatsapp} aria-label="Ask on WhatsApp">
          Chat
        </a>
      )}
    </aside>
  );
}
