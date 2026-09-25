"use client";
import { useState } from "react";
import DigitalConciergeModal from "./DigitalConciergeModal";
export default function DigitalConciergeWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="text-link"
        style={{ marginTop: 16 }}
        onClick={() => setOpen(true)}
      >
        Plan your stay →
      </button>
      <DigitalConciergeModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
