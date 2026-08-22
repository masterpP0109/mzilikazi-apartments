import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-dm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded',
  {
    variants: {
      variant: {
        primary:   'bg-[#C8922A] text-[#0B1B2B] hover:bg-[#D4A84B]',
        secondary: 'bg-transparent border-2 border-[#FAF6EE] text-[#FAF6EE] hover:bg-[#FAF6EE] hover:text-[#0B1B2B]',
        ghost:     'bg-transparent text-[#C8922A] hover:underline underline-offset-4',
        dark:      'bg-[#0B1B2B] text-[#FAF6EE] hover:bg-[#132338]',
        'ochre-outline': 'bg-transparent border-2 border-[#C8922A] text-[#C8922A] hover:bg-[#C8922A] hover:text-[#0B1B2B]',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  children: React.ReactNode;
}

export default function Button({ href, variant, size, className, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
