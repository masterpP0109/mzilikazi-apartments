import Image from "next/image";
import { SITE_LOGO } from "@/lib/constants";

/** The adjacent site name labels the brand; the symbol is decorative. */
export default function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Image
      src={SITE_LOGO.src}
      width={SITE_LOGO.width}
      height={SITE_LOGO.height}
      alt=""
      loading="eager"
      unoptimized
      className={footer ? "brand-logo brand-logo-footer" : "brand-logo"}
      sizes={footer ? "120px" : "(max-width: 389px) 56px, 72px"}
    />
  );
}
