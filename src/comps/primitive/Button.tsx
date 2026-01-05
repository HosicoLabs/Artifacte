import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function Button({ children, className = "" }: ButtonProps) {
  const baseClass =
    "cursor-pointer capitalize font-medium font-inter bg-white py-3 px-10";
  const customClass = className;

  const buttonClass = twMerge(baseClass, customClass);
  return <button className={buttonClass}>{children}</button>;
}
