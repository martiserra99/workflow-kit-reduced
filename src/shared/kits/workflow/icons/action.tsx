export function ActionIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.3333 11.3333L14.6667 8L11.3333 4.66667M4.66667 4.66667L1.33334 8L4.66667 11.3333M9.33334 2L6.66667 14"
        stroke="inherit"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
