"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import DigitalConciergeModal from "@/components/concierge/DigitalConciergeModal";
export default function Header() {
  const [open, setOpen] = useState(false),
    [planner, setPlanner] = useState(false);
  const path = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background =
      document.querySelectorAll<HTMLElement>("main, #site-footer");
    background.forEach((element) => {
      element.inert = true;
    });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          trigger.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLElement>("a,button") ?? [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0],
          last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const mq = window.matchMedia("(min-width:1280px)");
    const resize = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", resize);
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element) => {
        element.inert = false;
      });
      document.removeEventListener("keydown", key);
      mq.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <>
      <header className="site-header" data-menu-open={open}>
        <div className="container header-inner">
          <Link className="brand-name" href="/" onClick={() => setOpen(false)}>
            {SITE_NAME}
            <small>Victoria Falls · Zimbabwe</small>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={path === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
            <Link className="button button-primary" href="/contact">
              Check availability
            </Link>
          </nav>
          <button
            ref={trigger}
            className="icon-button menu-trigger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div id="mobile-menu" ref={panel} className="mobile-menu">
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={path === l.href ? "page" : undefined}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="actions">
              <Link
                href="/contact"
                className="button button-primary"
                onClick={() => setOpen(false)}
              >
                Check availability
              </Link>
              <button
                className="text-link"
                onClick={() => {
                  setOpen(false);
                  setPlanner(true);
                }}
              >
                Plan your stay →
              </button>
            </div>
          </div>
        )}
      </header>
      <DigitalConciergeModal
        isOpen={planner}
        onClose={() => setPlanner(false)}
      />
    </>
  );
}
