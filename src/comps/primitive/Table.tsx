import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type TableRowProps = {
  children: ReactNode;
  className?: string;
};

export function TableRow({ children, className }: TableRowProps) {
  const baseClass = "flex items-center justify-between w-full";

  return <div className={twMerge(baseClass, className)}>{children}</div>;
}

export type TableProps = {
  children: {
    headers: ReactNode;
    body: ReactNode;
  };
  className?: string;
};

export function Table({ children, className }: TableProps) {
  const baseClass =
    "flex flex-col items-center justify-between text-[14px] w-full font-inter";

  return (
    <div className={twMerge(baseClass, className)}>
      <div className="flex pb-2 items-center justify-between border-b border-b-[#d9d9d9] capitalize w-full">
        {children.headers}
      </div>
      <div className="flex flex-col gap-3 py-2 w-full">{children.body}</div>
    </div>
  );
}
