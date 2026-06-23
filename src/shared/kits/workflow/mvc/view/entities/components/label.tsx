import { cn } from "@/shared/lib/cn";

export default function Label({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-7 w-20 items-center justify-center rounded-xl border border-gray-200 bg-white ring-4 ring-gray-100",
        className,
      )}
      {...props}
    >
      <p className="text-xs font-semibold text-gray-950">{children}</p>
    </div>
  );
}
