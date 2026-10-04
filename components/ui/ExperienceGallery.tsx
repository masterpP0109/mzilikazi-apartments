"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Images } from "lucide-react";
import { isPublicMedia, type PropertyMedia } from "@/lib/property";
import { ImageFrame } from "./Editorial";
export default function ExperienceGallery({images, title}: {images: PropertyMedia[]; title: string}) {
  const media = images.filter(isPublicMedia);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<{x: number; y: number} | null>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const move = (direction: number) => setIndex(current => (current + direction + media.length) % media.length);
  const show = (i: number, button: HTMLButtonElement) => {
    trigger.current = button;
    setIndex(i);
    dialog.current?.showModal();
    setOpen(true);
  };
  if (!media.length) return <section className="experience-gallery-section"><h2>Gallery</h2><div className="experience-gallery-empty"><Images aria-hidden="true" size={32}/><p>Photographs of a specific host-led visit are not yet verified. The agreed host community and visit are identified in the booking proposal.</p></div></section>;
  const selected = media[index % media.length];
  return <section className="experience-gallery-section" aria-label={`${title} photographs`}>
    <h2>Gallery</h2>
    <div className="experience-gallery-grid">
      {media.map((image, i) => <button key={image.src} className={i === 0 ? "experience-gallery-featured" : undefined} onClick={event => show(i, event.currentTarget)} aria-label={`View photo ${i + 1}: ${image.alt}`}>
        <ImageFrame media={image} ratio="wide" sizes={i === 0 ? "(max-width: 639px) 85vw, (max-width: 1023px) 90vw, 65vw" : "(max-width: 639px) 85vw, 22vw"}/>
      </button>)}
    </div>
    <p className="form-note">Browse the photographs, then select one to view it larger. On mobile, swipe to explore.</p>
    <dialog ref={dialog} className="experience-lightbox" aria-label={`${title} photo gallery`} onClose={() => {setOpen(false); trigger.current?.focus();}}
      onKeyDown={event => {
        if (event.key === "ArrowRight") {event.preventDefault(); move(1);}
        if (event.key === "ArrowLeft") {event.preventDefault(); move(-1);}
      }}>
      <div className="dialog-header"><p aria-live="polite">{title} · {index + 1} / {media.length}</p><button autoFocus className="icon-button" aria-label="Close gallery" onClick={() => dialog.current?.close()}><X aria-hidden="true"/></button></div>
      {open && <>
        <div className="experience-lightbox-image" onPointerDown={event => {if(event.pointerType === "touch") touch.current={x:event.clientX,y:event.clientY};}}
          onPointerCancel={() => {touch.current=null;}}
          onPointerUp={event => {
            if (!touch.current) return;
            const dx = event.clientX-touch.current.x, dy=event.clientY-touch.current.y;
            touch.current=null;
            if (Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)) move(dx<0?1:-1);
          }}>
          <Image src={selected.src} alt={selected.alt} fill sizes="(max-width: 767px) 95vw, 1100px" loading="eager"/>
        </div>
        <p className="experience-lightbox-caption">{selected.alt}</p>
      </>}
      <div className="gallery-controls"><button className="button button-secondary" aria-label="Previous photo" onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true"/> Previous</button><button className="button button-secondary" aria-label="Next photo" onClick={() => move(1)}>Next <ArrowRight size={18} aria-hidden="true"/></button></div>
    </dialog>
  </section>;
}
