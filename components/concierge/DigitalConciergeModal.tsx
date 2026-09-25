"use client";
import { useState, useEffect, useRef, useId } from "react";
import { X } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { FAQ_ITEMS, whatsappUrl, SITE_NAME } from "@/lib/constants";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialSegment?: string;
}
export default function DigitalConciergeModal({
  isOpen,
  onClose,
  initialSegment,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [tab, setTab] = useState<"planner" | "questions">("planner");
  const [step, setStep] = useState(1);
  const [kind, setKind] = useState(initialSegment ?? "");
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [invoice, setInvoice] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    const el = dialog.current;
    if (isOpen) {
      el?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        el?.close();
        document.body.style.overflow = previous;
      };
    }
    el?.close();
  }, [isOpen]);
  const message = `Travel plans: ${kind}\nInterests: ${interests.join(", ")}\nInvoice requested: ${invoice ? "Yes" : "No"}\n${notes}`;
  const whatsapp = whatsappUrl(`Hello ${SITE_NAME},\n${message}`);
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
          <X />
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
      {tab === "questions" ? (
        <div>
          <div className="faq-list">
            {FAQ_ITEMS.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
          <form
            className="enquiry-form"
            onSubmit={(e) => {
              e.preventDefault();
              setAnswer(
                "Add this question to your enquiry so the team can respond about your specific visit.",
              );
            }}
          >
            <label className="field">
              Your question
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </label>
            <button className="button button-secondary">Ask a question</button>
            {answer && (
              <>
                <p role="status">{answer}</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setNotes(question);
                    setTab("planner");
                    setStep(2);
                  }}
                >
                  Add to my enquiry →
                </button>
              </>
            )}
          </form>
        </div>
      ) : step === 1 ? (
        <form
          className="enquiry-form"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <p>
            Collect your ideas, then send them with your dates. These are
            preferences to discuss, not reserved services.
          </p>
          <label className="field">
            Who is travelling?
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="">Choose if you wish</option>
              {[
                "Couple",
                "Family",
                "Friends or group",
                "Work or conference",
                "Solo",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend className="field-label">What interests you?</legend>
            <div className="planner-options">
              {[
                "The Falls",
                "Wildlife",
                "Culture",
                "Adventure",
                "Transfer information",
              ].map((v) => (
                <label key={v}>
                  <input
                    type="checkbox"
                    checked={interests.includes(v)}
                    onChange={() =>
                      setInterests(
                        interests.includes(v)
                          ? interests.filter((i) => i !== v)
                          : [...interests, v],
                      )
                    }
                  />
                  {v}
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  checked={invoice}
                  onChange={(e) => setInvoice(e.target.checked)}
                />
                Ask about invoicing
              </label>
            </div>
          </fieldset>
          <label className="field">
            Anything else?
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={4000}
            />
          </label>
          <button className="button button-primary">
            Add dates & contact details →
          </button>
          {whatsapp && (
            <a className="text-link" href={whatsapp}>
              Share ideas on WhatsApp →
            </a>
          )}
        </form>
      ) : (
        <>
          <button className="text-link" onClick={() => setStep(1)}>
            ← Edit your plan
          </button>
          <EnquiryForm
            key={message}
            defaultPreference={kind}
            initialValues={{ message }}
          />
        </>
      )}
    </dialog>
  );
}
