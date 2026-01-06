import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type SectionNameProps = ComponentProps<"p">;

export default function SectionName({ children, className }: SectionNameProps) {
  const baseClass =
    "opacity-60 font-inter text-[16px] md:text-lg font-medium uppercase";
  const finalClass = twMerge(baseClass, className);
  return <p className={finalClass}>{children}</p>;
}
