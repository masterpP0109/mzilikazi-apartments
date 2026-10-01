"use client";
import { useState, useEffect, useRef, useId } from "react";
import TripPlanner from "@/components/trip/TripPlanner";
import { FAQ_ITEMS } from "@/lib/constants";
import Link from "next/link";
export default function DigitalConciergeModal({
  isOpen,
  onClose,
  initialSegment,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialSegment?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [tab, setTab] = useState("planner");
  useEffect(() => {
    const el = dialog.current;
    if (!isOpen) {
      el?.close();
      return;
    }
    el?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby={titleId}
    >
      <div className="dialog-header">
        <div>
          <p className="eyebrow">Make a little plan</p>
          <h2 id={titleId}>Your Victoria Falls stay.</h2>
        </div>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close trip planner"
        >
          ✕
        </button>
      </div>
      <div className="planner-tabs">
        <button
          aria-pressed={tab === "planner"}
          onClick={() => setTab("planner")}
        >
          Trip planner
        </button>
        <button
          aria-pressed={tab === "questions"}
          onClick={() => setTab("questions")}
        >
          Questions
        </button>
      </div>
      {tab === "planner" ? (
        <TripPlanner initialSegment={initialSegment} />
      ) : (
        <>
          <div className="faq-list">
            {FAQ_ITEMS.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
          <Link className="text-link" href="/faq" onClick={onClose}>
            Before you arrive →
          </Link>
          <Link className="text-link" href="/contact" onClick={onClose}>
            Ask us a question →
          </Link>
        </>
      )}
    </dialog>
  );
}
