import React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        error && "border-red-500 focus-visible:ring-red-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
