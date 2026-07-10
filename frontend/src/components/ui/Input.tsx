import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            "flex h-12 w-full rounded-warm border-2 border-harmattanSand bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-charcoalInk/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marketClay focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-ripePepper focus-visible:ring-ripePepper",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs font-medium text-ripePepper">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
