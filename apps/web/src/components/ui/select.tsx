"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  clearable?: boolean;
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: React.ReactNode;
}

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  clearable?: boolean;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, children, clearable, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!isOpen) return;
      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as Node | null;
        if (containerRef.current && target && !containerRef.current.contains(target)) {
          setIsOpen(false);
        }
      };
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };
      document.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    const setRefs = (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }
    };

    return (
      <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen, clearable }}>
        <div ref={setRefs} className="relative" {...props}>
          {children}
        </div>
      </SelectContext.Provider>
    );
  }
);
Select.displayName = "Select";

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen, value, onValueChange, clearable } = React.useContext(SelectContext);

    const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
      if (!isOpen && clearable && value && (event.key === "Backspace" || event.key === "Delete")) {
        event.preventDefault();
        event.stopPropagation();
        onValueChange?.("");
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background text-foreground focus:outline-none focus:border-gray-900 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDownCapture={handleKeyDown}
        {...props}
      >
        {children}
        {/* クリア(X)アイコンは非表示にする */}
        <ChevronDown className="h-4 w-4 text-black ml-2" />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder, ...props }, ref) => {
    const { value } = React.useContext(SelectContext);

    return (
      <span
        ref={ref}
        className={cn("block truncate", value ? "text-foreground" : "text-muted-foreground")}
        {...props}
      >
        {value || placeholder}
      </span>
    );
  }
);
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, ...props }, ref) => {
    const { isOpen } = React.useContext(SelectContext);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className="absolute z-50 max-h-96 min-w-[8rem] overflow-y-auto rounded-md border border-gray-200 bg-white text-popover-foreground"
        {...props}
      >
        <div className="p-1">{children}</div>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { onValueChange, setIsOpen } = React.useContext(SelectContext);

    return (
      <option
        ref={ref}
        value={value}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        onClick={() => {
          onValueChange?.(value);
          setIsOpen(false);
        }}
        {...props}
      >
        {children}
      </option>
    );
  }
);
SelectItem.displayName = "SelectItem";

const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("", className)} {...props} />;
  }
);
SelectGroup.displayName = "SelectGroup";

const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
    );
  }
);
SelectLabel.displayName = "SelectLabel";

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue };
