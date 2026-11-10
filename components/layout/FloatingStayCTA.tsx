"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FloatingStayCTA() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (path === "/contact" || path === "/reviews/new") {
      setHidden(true);
      return;
    }
    let roomsVisible = false;
    let footerVisible = false;
    const visibleEnquiries = new Set<Element>();
    const update = () => setHidden(roomsVisible || footerVisible || visibleEnquiries.size > 0 || Boolean(
      document.querySelector("dialog[open]") ||
      document.querySelector('[data-menu-open="true"]') ||
      document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')
    ));
    const rooms = path === "/" ? document.getElementById("apartments") : path === "/apartments" ? document.querySelector("#rooms .accommodation-list") : null;
    const roomObserver = rooms && "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      roomsVisible = entries.some(entry => entry.isIntersecting);
      update();
    }) : null;
    if (rooms) roomObserver?.observe(rooms);

    const footer = document.querySelector("footer, .site-footer");
    const footerObserver = footer && "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      footerVisible = entries.some(entry => entry.isIntersecting);
      update();
    }) : null;
    if (footer) footerObserver?.observe(footer);

    const enquiryObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleEnquiries.add(entry.target);
        else visibleEnquiries.delete(entry.target);
      }
      update();
    }) : null;
    document.querySelectorAll('.experience-enquiry, .experience-hero .button, .experience-other .button, .experience-planning-note .button, [data-enquiry] button[type="submit"]').forEach(element => enquiryObserver?.observe(element));
    update();
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    const observer = new MutationObserver(update);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open", "data-menu-open"] });
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
      observer.disconnect();
      roomObserver?.disconnect();
      footerObserver?.disconnect();
      enquiryObserver?.disconnect();
    };
  }, [path]);
  return (
    <aside className="floating-stay" aria-label="Accommodation shortcut" hidden={hidden}>
      <div className="floating-stay-inner">
        <div className="floating-stay-details">
          <span className="floating-stay-rate">From US$130 <small>/ night</small></span>
          <span className="floating-stay-caption">2-Bedroom Suites</span>
        </div>
        <div className="floating-stay-actions">
          <Link href="/apartments" className="button button-secondary floating-suites-btn">
            Suites
          </Link>
          <Link href="/contact" className="button button-primary floating-cta-btn">
            Check Availability <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
