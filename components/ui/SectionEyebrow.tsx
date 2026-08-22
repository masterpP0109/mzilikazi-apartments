import { cn } from '@/lib/utils';

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** 'light' for use on dark backgrounds, 'dark' for use on light backgrounds */
  theme?: 'light' | 'dark';
}

export default function SectionEyebrow({ children, className, theme = 'dark' }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        'font-dm text-xs font-semibold uppercase tracking-[0.15em]',
        theme === 'dark'  ? 'text-[#C8922A]' : 'text-[#D4A84B]',
        className
      )}
    >
      {children}
    </p>
  );
}
