import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-marketClay text-white hover:bg-marketClay/90',
      secondary: 'bg-beverageTeal text-white hover:bg-beverageTeal/90',
      outline: 'border-2 border-marketClay text-marketClay hover:bg-marketClay/10',
      ghost: 'text-charcoalInk hover:bg-harmattanSand',
      danger: 'bg-ripePepper text-white hover:bg-ripePepper/90',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-warm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marketClay disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
