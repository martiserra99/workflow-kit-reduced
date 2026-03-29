import type { ReactNode, ComponentPropsWithoutRef } from "react";

import { PlusIcon } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const addVariants = cva(
  "flex size-8 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 transition-colors hover:border-neutral-500",
  {
    variants: {
      selected: { true: "border-blue-500 hover:border-blue-500" },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

interface AddProps extends ComponentPropsWithoutRef<"div"> {
  selected: boolean;
}

export default function Add({
  selected,
  className,
  ...props
}: AddProps): ReactNode {
  return (
    <div className={cn(addVariants({ selected }), className)} {...props}>
      <PlusIcon className="size-5 stroke-white" />
    </div>
  );
}
