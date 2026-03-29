import type { ReactNode, ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/lib/cn";

export default function Label({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">): ReactNode {
  return (
    <div
      className={cn(
        "flex h-8 w-20 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900",
        className,
      )}
      {...props}
    >
      <p className="text-sm font-semibold text-white">{children}</p>
    </div>
  );
}
