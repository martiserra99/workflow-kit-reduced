import type { ReactNode, ComponentPropsWithoutRef, ComponentType } from "react";

import { XIcon } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const blockVariants = cva(
  "box-border w-80 rounded-xl border border-neutral-700 bg-neutral-900 px-3 transition-colors hover:border-neutral-500",
  {
    variants: {
      selected: {
        true: "border-blue-500 hover:border-blue-500",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

interface BlockProps extends ComponentPropsWithoutRef<"div"> {
  selected: boolean;
}

export default function Block({
  selected,
  className,
  ...props
}: BlockProps): ReactNode {
  return (
    <div className={cn(blockVariants({ selected }), className)} {...props} />
  );
}

function Header({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">): ReactNode {
  return (
    <div
      className={cn("flex h-10 items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

Block.Header = Header;

function IconName({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">): ReactNode {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props} />
  );
}

Block.IconName = IconName;

interface IconProps extends ComponentPropsWithoutRef<"div"> {
  icon: ComponentType<ComponentPropsWithoutRef<"svg">>;
}

function Icon({ icon: Component, className, ...props }: IconProps): ReactNode {
  return (
    <div
      className={cn(
        "flex size-5 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800",
        className,
      )}
      {...props}
    >
      <Component className="size-3 stroke-white" />
    </div>
  );
}

Block.Icon = Icon;

function Name({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">): ReactNode {
  return (
    <p
      className={cn("font-sans text-sm font-semibold text-white", className)}
      {...props}
    />
  );
}

Block.Name = Name;

interface DeleteProps extends ComponentPropsWithoutRef<"button"> {
  onRemove: () => void;
}

function Delete({ onRemove, className, ...props }: DeleteProps): ReactNode {
  return (
    <button
      className={cn(
        "flex size-5 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 transition-colors hover:border-neutral-500 focus:border-neutral-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      {...props}
    >
      <XIcon className="size-3 stroke-white" />
    </button>
  );
}

Block.Delete = Delete;

const contentVariants = cva(
  "box-border flex h-9 items-center border-t border-t-neutral-800",
  {
    variants: {
      children: {
        true: "text-neutral-300",
        false: "text-neutral-500",
      },
    },
    defaultVariants: {
      children: false,
    },
  },
);

function Content({
  children,
  className,
}: ComponentPropsWithoutRef<"div">): ReactNode {
  return (
    <div
      className={cn(
        contentVariants({ children: Boolean(children) }),
        className,
      )}
    >
      <p className="overflow-hidden font-sans text-xs font-semibold text-nowrap text-ellipsis">
        {children ? children : "There is no text"}
      </p>
    </div>
  );
}

Block.Content = Content;
