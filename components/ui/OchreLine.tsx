import { cn } from '@/lib/utils';

interface OchreLineProps {
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'full';
}

const widthMap = {
  sm:   'w-8',
  md:   'w-16',
  lg:   'w-24',
  full: 'w-full',
};

export default function OchreLine({ className, width = 'md' }: OchreLineProps) {
  return (
    <div
      className={cn('h-0.5 bg-[#C8922A]', widthMap[width], className)}
      aria-hidden="true"
    />
  );
}
