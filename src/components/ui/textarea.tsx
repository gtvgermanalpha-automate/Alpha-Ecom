import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-input bg-white px-4 py-3 text-base text-foreground shadow-sm transition-[color,box-shadow] outline-none",
        "placeholder:text-muted-foreground/70",
        "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "field-sizing-content resize-none",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
