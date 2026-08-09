import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border-white/[0.08] bg-transparent hover:bg-white/[0.04] text-zinc-300 hover:text-white",
        secondary:
          "bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1] hover:text-white",
        ghost:
          "hover:bg-white/[0.06] hover:text-white text-zinc-400",
        destructive:
          "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-7 gap-1 rounded-md px-2.5 text-xs",
        lg: "h-11 gap-1.5 px-4 text-sm",
        icon: "h-9 w-9",
        "icon-xs":
          "h-6 w-6 rounded-md",
        "icon-sm":
          "h-7 w-7 rounded-md",
        "icon-lg": "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
