"use client";

import Button from "@/comps/primitive/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function DetailsTable() {
  const DETAILS_LIST = [
    {
      label: "mint",
      value: "9R4R...Ym8Q",
    },
    {
      label: "owner",
      value: "8Gwd...DQrh",
    },
  ];
  return (
    <div className="px-4 py-6 rounded-t-2xl bg-[#fafafa] border border-[#d9d9d9] border-b-transparent">
      <img src="./img/twitter.png" alt="" className="block w-5" />
      <p className="capitalize text-[14px] py-2">cabinet vint</p>

      <ul className="flex flex-col gap-3 pt-1 border-t border-t-[#d9d9d9]">
        {DETAILS_LIST.map((item, i) => {
          return (
            <li key={i} className="flex items-center justify-between">
              <p className="font-inter capitalize text-[14px] text-[#857F94]">
                {item.label}
              </p>
              <div className="flex items-center">
                <img src="./img/price-icon.png" className="w-4" alt="" />
                <p className="font-inter text-[14px] text-[#111]">
                  {item.value}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CollectionItemDetail({ onClose }: { onClose?: () => void }) {
  const [detail, setDetail] = useState<string>("details");
  const COLLECTION_STATS_LIST = [
    {
      label: "list price",
      value: "14.738",
      currency: "sol",
    },
    {
      label: "floor price",
      value: "14.738",
      currency: "sol",
    },
    {
      label: "floor diff",
      value: "0.42%",
      currency: null,
    },
    {
      label: "top offer",
      value: "14.267",
      currency: "sol",
    },
  ];

  return (
    <div className="px-1.5 md:px-7 pt-9.5 md:pt-5.5">
      <Button
        className="hidden md:block bg-transparent p-0 ml-auto"
        onClick={onClose}
      >
        <img className="w-5.5" src="./img/close-outline.png" alt="" />
      </Button>

      <h2 className="font-grotesk font-medium uppercase text-[32px] md:text-[40px] md:my-3 text-[#0A0F2E]">
        Oakwood Cabinet
      </h2>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <p className="font-satoshi capitalize text-lg text-gray-500">
            cabinet vint
          </p>
          <img src="./img/verified.png" className="w-4.5" alt="" />
        </div>

        <p className="font-satoshi text-gray-500">
          Owned by:{" "}
          <span className="text-black max-w-[10em] overflow-hidden">
            2386...Ygde
          </span>
        </p>
      </div>

      <p className="font-grotesk font-medium text-[#0A0F2E] border-t border-t-[#d9d9d9] text-[36px] mb-2">
        4.283 <span className="text-2xl">sol</span>
      </p>

      <div className="flex justify-between items-center">
        <p className="text-satoshi text-lg text-[#6B7280]">($587.26)</p>

        <div className="flex items-center gap-[.5em]">
          <p className="text-satoshi text-lg text-[#6B7280]">Pay with:</p>

          <Button className="p-0 bg-transparent flex">
            <span className="text-black uppercase font-satoshi font-regular">
              $sol
            </span>
            <img src="./img/chevron-down.png" className="w-6" alt="" />
          </Button>
        </div>
      </div>

      <Button className="w-full bg-[#191919] text-white font-inter py-3 my-3">
        buy now
      </Button>

      <ul className="flex gap-2 justify-between">
        {COLLECTION_STATS_LIST.map((item, i) => {
          return (
            <li
              key={i}
              className="flex flex-col items-center justify-center border border-[#d5d0e1] rounded-md py-1 md:py-1.5 grow "
            >
              <p className="capitalize font-inter text-[14px] text-center text-[#857F94]">
                {item.label}
              </p>
              <p className="uppercase font-inter text-[14px] font-bold text-[#191919]">
                {item.value}
                {item.currency && <span className="text-[#857F94]"> sol</span>}
              </p>
            </li>
          );
        })}
      </ul>

      <ul className="flex items-center justify-between mt-10.5 md:mt-11 mb-2">
        {["traits", "offers", "activity", "price history", "details"].map(
          (e, i) => {
            const buttonClass = "p-0 bg-transparent font-regular";
            const labelClass = "font-inter text-[14px]";
            const colorClass =
              e == detail
                ? "font-medium text-[#191919]"
                : "font-regular text-[#857F94]";
            return (
              <li key={i}>
                <Button
                  onClick={() => setDetail(() => e)}
                  className={buttonClass}
                >
                  <span className={twMerge(labelClass, colorClass)}>{e}</span>
                </Button>
              </li>
            );
          }
        )}
      </ul>

      <DetailsTable />
    </div>
  );
}

function CollectionItemStats() {
  const statsBaseClass = "font-inter text-sm text-[#857F94]";
  const valueClass = "font-bold text-[#191919]";
  const labelClass = "font-bold ";

  return (
    <div className="hidden md:flex items-center justify-between px-7 py-3.5">
      <p className={twMerge(statsBaseClass, "text-[#191919]")}>SMB Gen2</p>
      <p className={statsBaseClass}>
        <span className="capitalize">floor: </span>
        <span className={valueClass}>14.39 </span>
        <span className={twMerge(labelClass, "uppercase")}>sol </span>
        <span className="text-[#40E281]">0.98%</span>
      </p>
      <p className={statsBaseClass}>
        <span className="capitalize">top offer: </span>
        <span className={valueClass}>14.33 </span>
        <span className={twMerge(labelClass, "uppercase")}>sol </span>
      </p>
      <p className={statsBaseClass}>
        <span className="capitalize">24hr vol: </span>
        <span className={valueClass}>560.39 </span>
        <span className={twMerge(labelClass, "uppercase")}>sol </span>
      </p>
      <p className={statsBaseClass}>
        <span className="capitalize">24hr sales: </span>
        <span className={valueClass}>38 </span>
      </p>
      <p className={statsBaseClass}>
        <span className="capitalize">listed: </span>
        <span className={valueClass}>367 </span>
        <span>7.35% </span>
      </p>
      <p className={statsBaseClass}>
        <span className="capitalize">owners: </span>
        <span className={valueClass}>2605 </span>
        <span>52.2% </span>
      </p>
    </div>
  );
}

export type CollectionItemPopupProps = {
  open?: boolean;
  onClose?: () => void;
};

export default function CollectionItemPopup({
  open = false,
  onClose,
}: CollectionItemPopupProps) {
  const defaultOverlayClass =
    "fixed z-50 w-full h-full top-0 left-0 bg-[#0A0F2E40] grid items-center";

  const overlayClass = twMerge(
    defaultOverlayClass,
    open ? "grid items-center" : "hidden"
  );
  return (
    <div className={overlayClass}>
      <div className="max-h-screen overflow-y-scroll mx-auto bg-white rounded-2xl md:rounded-xl overflow-hidden max-w-[calc(100vw-16px)]">
        <div className="flex flex-col md:flex-row  pt-0.5 pl-0.5">
          <img
            className="max-w-full rounded-2xl md:rounded-xl aspect-square overflow-hidden"
            src="./img/collection-item-1.png"
            alt=""
          />
          <CollectionItemDetail onClose={onClose} />
        </div>
        <CollectionItemStats />
      </div>
    </div>
  );
}
