import { XIcon } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const blockVariants = cva(
  "w-80 rounded-xl border border-gray-200 bg-white px-3 ring-4 ring-gray-100 transition-colors hover:border-gray-300",
  {
    variants: {
      selected: {
        true: "border-emerald-400 ring-emerald-100 hover:border-emerald-400",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

interface BlockProps extends React.ComponentProps<"div"> {
  selected: boolean;
}

function Block({ selected, className, ...props }: BlockProps) {
  return (
    <div className={cn(blockVariants({ selected }), className)} {...props} />
  );
}

function Header({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex h-10 items-center gap-2", className)} {...props} />
  );
}

function IconName({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-w-0 items-center gap-2", className)}
      {...props}
    />
  );
}

interface IconProps extends React.ComponentProps<"div"> {
  icon: React.ComponentType<React.ComponentProps<"svg">>;
}

function Icon({ icon: Component, className, ...props }: IconProps) {
  return (
    <div
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-100",
        className,
      )}
      {...props}
    >
      <Component className="size-3 stroke-gray-500" />
    </div>
  );
}

function Name({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("truncate text-sm font-semibold text-gray-900", className)}
      {...props}
    />
  );
}

interface DeleteProps extends React.ComponentProps<"button"> {
  onRemove: () => void;
}

function Delete({ onRemove, className, ...props }: DeleteProps) {
  return (
    <button
      className={cn(
        "ml-auto flex size-5 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-100 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      {...props}
    >
      <XIcon className="size-3 stroke-gray-400" />
    </button>
  );
}

const contentVariants = cva(
  "flex h-9 items-center border-t border-t-gray-200",
  {
    variants: {
      children: {
        true: "text-gray-500",
        false: "text-gray-400",
      },
    },
    defaultVariants: {
      children: false,
    },
  },
);

function Content({ children, className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        contentVariants({ children: Boolean(children) }),
        className,
      )}
    >
      <p className="overflow-hidden text-xs font-medium text-nowrap text-ellipsis">
        {children ? children : "There is no text"}
      </p>
    </div>
  );
}

export default Object.assign(Block, {
  Header,
  IconName,
  Icon,
  Name,
  Delete,
  Content,
});
