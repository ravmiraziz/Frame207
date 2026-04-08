import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-purple-600 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-colors",
          checked ? "bg-purple-600 text-white" : "bg-white",
          className,
        )}
      >
        {checked && <Check className="h-3 w-3" />}
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          ref={ref}
          {...props}
        />
      </button>
    );
  },
);
Checkbox.displayName = "Checkbox";
