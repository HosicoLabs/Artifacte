import Button from "@/comps/primitive/Button";
import SectionWrapper from "@/comps/primitive/SectionWrapper";
import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function DropdownButton({
  children,
  fontSize = "text-[18px]",
}: {
  children: ReactNode;
  fontSize?: string;
}) {
  return (
    <Button className="p-0 flex items-center gap-3 bg-transparent">
      <span className={twMerge("capitalize font-medium", fontSize)}>
        {children}
      </span>
      <img className="w-5" src="./img/chevron-down.png" alt="" />
    </Button>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-12 ">
      <Button className="p-2">
        <img src="./img/chevron-left.png" className="w-6" alt="" />
      </Button>
      <nav className="h-full ">
        <ul className="flex items-center">
          {Array.from({ length: 5 }).map((e, i) => {
            const ACTIVE_PAGE = 3;
            const baseClass = "font-medium text-xl py-1.25 px-2 border-b";
            return (
              <li
                key={i}
                className={twMerge(
                  baseClass,
                  i + 1 == ACTIVE_PAGE
                    ? "text-black border-b-2 border-b-[#6C737F]"
                    : "text-[#6C737F] border-b-[#6C737F]"
                )}
              >
                <Link href="#">{i + 1}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Button className="p-2">
        <img src="./img/chevron-right.png" className="w-6" alt="" />
      </Button>
    </div>
  );
}

export default function CollectionAssets() {
  return (
    <SectionWrapper className="md:px-10 md:py-10">
      <form className="bg-white rounded-xl overflow-hidden flex items-center justify-between px-3.5 relative">
        <input
          className="placeholder:text-black placeholder:capitalize py-4.5 grow"
          type="text"
          placeholder="search assets"
        />
        <Button
          className="p-0 absolute right-3.5 top-[50%] translate-y-[-50%]"
          type="submit"
        >
          <img className="w-4.5" src="./img/search-dark.png" alt="" />
        </Button>
      </form>
      <div className="flex items-center justify-between md:mt-10">
        <div className="flex items-center gap-5 ">
          <DropdownButton>category</DropdownButton>
          <DropdownButton>era</DropdownButton>
          <DropdownButton>edition/supply</DropdownButton>
        </div>

        <div className="flex items-center">
          <p className="capitalize font-medium text-[18px]">
            56 items sort by :
          </p>
          <DropdownButton fontSize="text-[18px]">
            highest edition
          </DropdownButton>
        </div>
      </div>

      <Pagination />
    </SectionWrapper>
  );
}
