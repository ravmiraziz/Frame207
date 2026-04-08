import React from "react";
import { cn } from "../../lib/utils";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  className,
  required,
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
          {label}
          {required && <span className="text-purple-600">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
