import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function Button({
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const baseClass =
    "cursor-pointer capitalize font-medium font-inter bg-white py-3 px-10";
  const customClass = className;

  const buttonClass = twMerge(baseClass, customClass);
  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
}
