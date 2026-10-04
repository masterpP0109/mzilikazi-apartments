import Image from "next/image";
import { SITE_LOGO, SITE_NAME } from "@/lib/constants";

/** Label the logo so the home link remains accessible without visible text. */
export default function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Image
      src={SITE_LOGO.src}
      width={SITE_LOGO.width}
      height={SITE_LOGO.height}
      alt={SITE_NAME}
      loading="eager"
      unoptimized
      className={footer ? "brand-logo brand-logo-footer" : "brand-logo"}
      sizes={footer ? "120px" : "(max-width: 389px) 56px, 72px"}
    />
  );
}
