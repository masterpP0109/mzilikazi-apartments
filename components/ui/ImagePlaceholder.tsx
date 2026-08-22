import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  ariaLabel: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | '4/3' | '16/9' | '3/2';
  className?: string;
  /** Optional CMS field name for content editors */
  'data-placeholder'?: string;
}

const aspectRatioMap: Record<string, string> = {
  square:    'aspect-square',
  landscape: 'aspect-video',
  portrait:  'aspect-[3/4]',
  '4/3':     'aspect-[4/3]',
  '16/9':    'aspect-video',
  '3/2':     'aspect-[3/2]',
};

export default function ImagePlaceholder({
  ariaLabel,
  aspectRatio = '4/3',
  className,
  'data-placeholder': dataPlaceholder,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      data-placeholder={dataPlaceholder}
      className={cn(
        'bg-[#E2D9C8] flex items-center justify-center text-[#4A5568] overflow-hidden',
        aspectRatioMap[aspectRatio] ?? aspectRatioMap['4/3'],
        className
      )}
    >
      <div className="text-center p-4 select-none pointer-events-none">
        <div className="w-10 h-10 mx-auto mb-2 opacity-30">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        <p className="text-xs font-dm opacity-40">{ariaLabel}</p>
      </div>
    </div>
  );
}
