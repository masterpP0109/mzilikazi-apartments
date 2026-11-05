"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Discreet inline "Read more / Show less" disclosure.
 *
 * - The extra content is always present in the server-rendered HTML
 *   (`hidden="until-found"`), so it stays indexable and findable with the
 *   browser's find-in-page, which will also auto-expand it.
 * - Keyboard accessible native <button> with aria-expanded / aria-controls.
 * - No animation, so there is no layout jump and reduced-motion is respected.
 */
export default function ReadMore({
  children,
  moreLabel = "Read more",
  lessLabel = "Show less",
}: {
  children: ReactNode;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Expand automatically when the browser reveals text via find-in-page.
  useEffect(() => {
    const el = panel.current;
    if (!el) return;

    if (!open) {
      el.setAttribute("hidden", "until-found");
    } else {
      el.removeAttribute("hidden");
    }

    const reveal = () => setOpen(true);
    el.addEventListener("beforematch", reveal);
    return () => el.removeEventListener("beforematch", reveal);
  }, [open]);

  return (
    <div className="read-more">
      <div id={id} ref={panel} className="read-more-panel">
        {children}
      </div>
      <button
        type="button"
        className="text-link read-more-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? lessLabel : moreLabel}
      </button>
    </div>
  );
}
