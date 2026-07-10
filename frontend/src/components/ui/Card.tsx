import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'warm';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-warm bg-white text-charcoalInk shadow-sm border-2 border-harmattanSand",
          variant === 'warm' && "shadow-[4px_4px_0px_0px_rgba(242,233,220,1)]",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };
