"use client";

import Button from "@/comps/primitive/Button";
import SectionWrapper from "@/comps/primitive/SectionWrapper";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import CollectionItemPopup from "./CollectionPopup";

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
    <div className="hidden md:flex items-center justify-center gap-12 ">
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

type CollectionItemType = {
  img: string;
  price: string;
  edition: string;
  name: string;
};

type CollectionItemProps = CollectionItemType & {
  onClick: () => void;
  className?: string;
};

const COLLECTION_ASSETS_LIST: CollectionItemType[] = [
  {
    img: "./img/collection-item-1.png",
    name: "edwin dining chair",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-2.png",
    name: "aria dining chair",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-3.png",
    name: "sydney armchair",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-4.png",
    name: "oxley coffe table",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-5.png",
    name: "edwin dining chair",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-6.png",
    name: "aria dining chair",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-7.png",
    name: "sydney armchair",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-8.png",
    name: "oxley coffe table",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-9.png",
    name: "lara armchair",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-10.png",
    name: "noelle modular curved",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-11.png",
    name: "garret armchair",
    edition: "3/50",
    price: "2.6eth",
  },
  {
    img: "./img/collection-item-12.png",
    name: "theodore armchair",
    edition: "3/50",
    price: "2.6eth",
  },
];

function CollectionItem({
  img,
  name,
  edition,
  price,
  onClick,
  className,
}: CollectionItemProps) {
  const detailBaseClass = "flex flex-col  mt-4 md:mt-5 gap-2 md:gap-2.5";
  const itemNameClass =
    "uppercase text-[16px] md:text-[20px] font-medium text-5";
  const itemPriceClass = "font-inter text-[#555] tracking-[-5%] leading-[150%]";

  const containerBaseClass = "basis-[calc(25%-20px)]";

  return (
    <div className={twMerge(containerBaseClass, className)} onClick={onClick}>
      <img src={img} alt={name} />
      <div className={detailBaseClass}>
        <p className={itemNameClass}>{name}</p>
        <div
          className={twMerge("flex grow items-center justify-between w-fit")}
        >
          <p className={`${itemPriceClass} pr-3 border-r border-r-[#6C737F]`}>
            Current Price: <span className="font-bold uppercase">{price}</span>
          </p>
          <p className={`${itemPriceClass} pl-3`}>
            Edition:{" "}
            <span className="font-bold uppercase">{edition || "-"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CollectionAssets() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <CollectionItemPopup open={open} onClose={() => setOpen(() => false)} />
      <SectionWrapper className="md:px-10 md:py-10 bg-[#FAF6F3] md:bg-transparent border border-[#D9D9D9] md:border-transparent">
        <form className="bg-white rounded-[18px] md:rounded-xl overflow-hidden flex items-center justify-between px-3 md:px-3.5 relative">
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
        <div className="hidden md:flex items-center justify-between md:mt-10">
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
        <ul className="flex flex-col md:flex-row flex-wrap gap-x-5 gap-y-8 md:gap-y-10 justify-center mt-6 md:mt-10 mb-6 md:mb-20">
          {COLLECTION_ASSETS_LIST.map((item, i) => {
            return (
              <CollectionItem
                key={i}
                className={`${i < 3 ? "block" : "hidden"} md:block`}
                onClick={() => setOpen(() => true)}
                {...item}
              />
            );
          })}
        </ul>

        <Pagination />
        <Button className="font-geist bg-[#00000005] text-black md:hidden block mx-auto">
          see more
        </Button>
      </SectionWrapper>
    </>
  );
}
