import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type SectionWrapperProps = {} & ComponentProps<"section">;

export default function SectionWrapper({
  children,
  className = "",
}: SectionWrapperProps) {
  const baseClass =
    "px-4 md:px-10 mx-2 md:mx-0 my-2 md:my-0 pt-10 md:pt-20 pb-6 md:pb-20 bg-[#FAF6F3]";
  const finalClass = twMerge(baseClass, className);
  return <section className={finalClass}>{children}</section>;
}
