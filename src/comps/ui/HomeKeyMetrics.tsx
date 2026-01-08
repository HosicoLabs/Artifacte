"use client";
import { useState } from "react";
import Button from "../primitive/Button";
import { twMerge } from "tailwind-merge";
import SectionName from "../primitive/SectionName";
import SectionWrapper from "../primitive/SectionWrapper";

function FirstSection() {
  const DETAILS = [
    {
      value: "$1B+",
      title: "Asset value listed",
      desc: "Representing the cumulative value of assets presented across curated listings.",
    },
    {
      value: "$100M+",
      title: "Auction volume completed",
      desc: "Generated through confirmed transactions and successfully closed sales.",
    },
    {
      value: "10,000+",
      title: "Active participants",
      desc: "Including collectors and asset owners engaged across the platform.",
    },
  ];
  return (
    <SectionWrapper className="pr-10 md:pl-0 ">
      <div className="pl-10 mb-10">
        <SectionName>key metrics</SectionName>
        <h2 className="font-medium text-[40px] capitalize">
          platform at a glance
        </h2>
      </div>

      <div className="flex gap-10 ">
        <div className="relative grow overflow-hidden">
          <img
            className="absolute top-0 left-0 z-1 pointer-events-none brightness-80 block min-w-full max-w-full min-h-full max-h-full object-cover"
            src="./img/home-key-metrices.png"
            alt=""
          />
          <div className=" p-10 flex flex-col justify-end h-full relative z-2">
            <p className="text-[36px] leading-[130%] text-white mb-15 capitalize max-w-[18em]">
              Built for assets that require confidence, discretion, and
              long-term perspective — not short-term speculation.
            </p>

            <p className="text-white text-xl capitalize">broollyn simmons</p>
            <p className="text-white text-xl opacity-75 capitalize">
              on twitter
            </p>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-[#d9d9d9]">
          {DETAILS.map((item, i) => {
            return (
              <div
                key={i}
                className={`${
                  i == 0 ? "pb-8" : i == DETAILS.length - 1 ? "pt-7" : "py-8"
                }`}
              >
                <p className="text-[64px] mb-3 leading-[120%] tracking-[-2%]">
                  {item.value}
                </p>
                <p className="mb-3 font-medium text-[24px] leading-[150%] tracking-[-2%]">
                  {item.title}
                </p>
                <p className="font-light text-[20px] max-w-[20em] leading-[150%] tracking-[-2%]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

function SecondSection() {
  const [selected, setSelected] = useState<string>("");
  const STEPS = [
    {
      icon: "./img/battery-full.png",
      title: "describe the asset",
      desc: "Provide key details, ownership information, and provenance to represent your real-world asset as an NFT.",
    },
    {
      icon: "./img/upload.png",
      title: "upload proof & documentation",
      desc: "Provide key details, ownership information, and provenance to represent your real-world asset as an NFT.",
    },
    {
      icon: "./img/speaker.png",
      title: "review and submit",
      desc: "Provide key details, ownership information, and provenance to represent your real-world asset as an NFT.",
    },
    {
      icon: "./img/feather.png",
      title: "asset verification",
      desc: "Provide key details, ownership information, and provenance to represent your real-world asset as an NFT.",
    },
    {
      icon: "./img/bot.png",
      title: "auction goes live",
      desc: "Provide key details, ownership information, and provenance to represent your real-world asset as an NFT.",
    },
  ];

  return (
    <SectionWrapper className="flex justify-between  items-start">
      <div>
        <h2 className="font-medium text-[40px] pb-6 max-w-[13em]">
          How to Submit Real-World Asset NFTs for Auction
        </h2>
        <p className="text-xl max-w-[30em]">
          List your real-world assets as NFTs in just a few simple steps—
          secure, transparent, and globally accessible.
        </p>
        <ul className="pt-10 pb-20">
          {STEPS.map((item, i) => {
            const defaultClass =
              "p-5 border-l-2 border-l-[#cccccc] flex items-start gap-4 overflow-hidden max-h-[3em] transition duration-300 ease-in-out";
            const selectedClass = "border-l-2 border-l-black max-h-full";
            const finalClass = twMerge(
              defaultClass,
              selected == item.title ? selectedClass : ""
            );
            return (
              <li
                key={i}
                onClick={() => setSelected(() => item.title)}
                className={finalClass}
              >
                <img className="w-5" src={item.icon} alt="" />
                <div>
                  <p className="mb-3 font-medium text-xl capitalize">
                    {item.title}
                  </p>
                  <p className="text-xl text-[#6C737F] max-w-[25em]">
                    {item.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <Button className="text-white bg-[#162737]">submit now</Button>
      </div>
      <img
        className="basis-1/2 max-w-[53%]"
        src="./img/home-key-metrices-bot.png"
        alt=""
      />
    </SectionWrapper>
  );
}

export default function HomeKeyMetrices() {
  return (
    <>
      <FirstSection />
      <SecondSection />
    </>
  );
}
