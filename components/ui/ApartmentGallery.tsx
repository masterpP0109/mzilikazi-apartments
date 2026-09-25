"use client";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { isPublicMedia, type PropertyMedia } from "@/lib/property";
import { ImageFrame } from "./Editorial";
export default function ApartmentGallery({
  images,
}: {
  images: PropertyMedia[];
}) {
  const media = images.filter((m) => isPublicMedia(m) && m.kind === "property");
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  if (!media.length) return null;
  const show = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  return (
    <section aria-label="Apartment photographs">
      <div className="gallery">
        {media.map((m, i) => (
          <button
            key={m.src}
            onClick={() => show(i)}
            aria-label={`View photo ${i + 1}: ${m.alt}`}
          >
            <ImageFrame media={m} />
          </button>
        ))}
      </div>
      <button className="text-link" onClick={() => show(0)}>
        View all photos →
      </button>
      <dialog
        ref={dialog}
        aria-label="Apartment photo gallery"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setIndex((index + 1) % media.length);
          if (e.key === "ArrowLeft")
            setIndex((index - 1 + media.length) % media.length);
        }}
      >
        <div className="dialog-header">
          <p>
            {index + 1} / {media.length}
          </p>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close gallery"
          >
            <X />
          </button>
        </div>
        <ImageFrame media={media[index]} />
        <p>{media[index].alt}</p>
        <div className="gallery-controls">
          <button
            className="text-link"
            onClick={() => setIndex((index - 1 + media.length) % media.length)}
          >
            ← Previous
          </button>
          <button
            className="text-link"
            onClick={() => setIndex((index + 1) % media.length)}
          >
            Next →
          </button>
        </div>
      </dialog>
    </section>
  );
}
