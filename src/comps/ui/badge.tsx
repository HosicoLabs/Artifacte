import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#191919] text-white',
        secondary: 'border-transparent bg-[#EEECE9] text-[#191919]',
        destructive: 'border-transparent bg-red-500 text-white',
        outline: 'text-[#191919] border-[#D9D9D9]',
        success: 'border-transparent bg-[#40E281] text-[#191919]',
        primary: 'border-transparent bg-[#AC463A] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={twMerge(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
