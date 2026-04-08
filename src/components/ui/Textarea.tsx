import React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  maxLength?: number;
  currentLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, maxLength, currentLength, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
            error && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          ref={ref}
          maxLength={maxLength}
          {...props}
        />
        {maxLength !== undefined && (
          <div className="absolute bottom-2 right-4 text-[10px] text-gray-400">
            {currentLength || 0}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
