import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
  Palette rule: buttons are Habanero; hover state shifts to Aster blue (with navy
  text for contrast). Links/nav hover to Aster blue too. Only the four brand
  colours are used.
*/
const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-aster/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-habanero text-white shadow-glow hover:bg-aster hover:text-navy hover:-translate-y-0.5 active:translate-y-0",
        navy: "bg-navy text-white hover:bg-aster hover:text-navy hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-navy/15 bg-transparent text-navy hover:border-aster hover:bg-aster hover:text-navy hover:-translate-y-0.5",
        "outline-white":
          "border border-white/40 bg-transparent text-white hover:border-aster hover:bg-aster hover:text-navy",
        soft: "bg-aster-100 text-navy hover:bg-aster hover:text-navy",
        ghost: "text-navy hover:bg-aster-100",
        link: "text-navy underline-offset-4 hover:text-habanero hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-9 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
