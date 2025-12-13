"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === RadioGroupItem) {
            const childProps = child.props as RadioGroupItemProps;
            return React.cloneElement(child, {
              checked: childProps.value === value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                onValueChange?.(e.target.value);
              },
            } as RadioGroupItemProps);
          }
          return child;
        })}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <input
        type="radio"
        value={value}
        className={cn(
          "h-4 w-4 border border-gray-300 bg-white text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
