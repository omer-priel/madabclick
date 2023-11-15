import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/styling';

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary hover:bg-primary-light',
        secondary: 'bg-secondary text-secondary hover:bg-secondary-light',
        error: 'bg-error text-error hover:bg-error-light',
        warning: 'bg-warning text-warning hover:bg-warning-light',
        success: 'bg-success text-success hover:bg-success-light',
      },
      size: {
        default: 'h-10 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

Button.displayName = 'Button';

export default Button;
export { buttonVariants };
