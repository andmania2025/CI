"use client";

import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import * as React from "react";

const SelectContentContext = React.createContext<{
  clearable?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

const Select = ({
  clearable,
  onValueChange,
  value,
  children,
  ...props
}: SelectPrimitive.SelectProps & { clearable?: boolean }) => {
  return (
    <SelectContentContext.Provider value={{ clearable, value, onValueChange }}>
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        {...props}
      >
        {children}
      </SelectPrimitive.Root>
    </SelectContentContext.Provider>
  );
};

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { clearable, value, onValueChange } =
    React.useContext(SelectContentContext);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Backspace または Delete で値をクリアする (既存のロジックの維持)
    if (
      clearable &&
      value &&
      (event.key === "Backspace" || event.key === "Delete")
    ) {
      event.preventDefault();
      onValueChange?.("");
    }
  };

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background text-foreground focus:outline-none focus:border-gray-900 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-black ml-2" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[60vh] min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 p-1",
        position === "popper" &&
          "data-side-bottom:translate-y-1 data-side-left:-translate-x-1 data-side-right:translate-x-1 data-side-top:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-bold text-[#093893] text-center w-full",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center justify-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-[#093893] hover:text-white focus:bg-[#093893] focus:text-white data-disabled:pointer-events-none data-disabled:opacity-50 text-[#093893] data-state-checked:bg-accent/50 data-state-checked:text-accent-foreground data-state-checked:font-medium",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <span className="h-2 w-2 rounded-full bg-current" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
