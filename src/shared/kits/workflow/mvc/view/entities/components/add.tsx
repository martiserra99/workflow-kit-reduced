import { PlusIcon } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const addVariants = cva(
  "flex size-8 items-center justify-center rounded-xl border border-gray-200 bg-white ring-4 ring-gray-100 transition-colors hover:border-gray-300",
  {
    variants: {
      selected: {
        true: "border-emerald-500 ring-emerald-100 hover:border-emerald-500",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

interface AddProps extends React.ComponentProps<"div"> {
  selected: boolean;
}

export default function Add({ selected, className, ...props }: AddProps) {
  return (
    <div className={cn(addVariants({ selected }), className)} {...props}>
      <PlusIcon className="size-4 stroke-gray-500" />
    </div>
  );
}
