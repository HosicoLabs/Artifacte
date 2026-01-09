"use client";
import { useState } from "react";
import Button from "../primitive/Button";
import { twMerge } from "tailwind-merge";
import SectionName from "../primitive/SectionName";
import SectionWrapper from "../primitive/SectionWrapper";
import Picture from "../primitive/Picture";

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
    <SectionWrapper className="md:pr-10 md:pl-0 bg-[#FAF6F3] md:bg-white border border-[#D9D9D9] md:border-transparent">
      <div className="md:pl-10 mb-6 md:mb-10 flex flex-col items-center md:items-start">
        <SectionName>key metrics</SectionName>
        <h2 className="font-medium text-2xl md:text-[40px] capitalize">
          platform at a glance
        </h2>
      </div>

      <div className="flex gap-6 md:gap-10 flex-col md:flex-row">
        <div className="relative grow overflow-hidden">
          <Picture
            smSrc="./img/home-key-metrices-sm.png"
            mdSrc="./img/home-key-metrices.png"
            className="absolute top-0 left-0 z-1 pointer-events-none brightness-80 block min-w-full max-w-full min-h-full max-h-full object-cover"
          />

          <div className="p-3.75 mt-31.75 md:mt-0 md:p-10 flex flex-col justify-end h-full relative z-2">
            <p className="text-[13px] md:text-[36px] leading-[130%] text-white mb-5.5 md:mb-15 capitalize max-w-[18em]">
              Built for assets that require confidence, discretion, and
              long-term perspective — not short-term speculation.
            </p>

            <p className="text-white text-xl text-[7px] md:text-[16px] capitalize">
              broollyn simmons
            </p>
            <p className="text-white text-xl text-[7px] md:text-[16px] opacity-75 capitalize">
              on twitter
            </p>
          </div>
        </div>
        <div className="flex gap-2.75 md:gap-0 md:flex-col md:divide-y md:divide-[#d9d9d9] justify-between">
          {DETAILS.map((item, i) => {
            return (
              <div
                key={i}
                className={`${
                  i == 0
                    ? "md:pb-8"
                    : i == DETAILS.length - 1
                    ? "md:pt-7"
                    : "md:py-8"
                }`}
              >
                <p className="mb-1 md:mb-3 text-[21px] md:text-[64px] leading-[120%] tracking-[-2%]">
                  {item.value}
                </p>
                <p className="mb-1 md:mb-3  text-[8px] md:text-[24px] leading-[150%] tracking-[-2%] font-medium">
                  {item.title}
                </p>
                <p className="text-[6.75px] md:text-[20px] leading-[150%] tracking-[-2%]  max-w-[20em] font-light">
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
    <SectionWrapper className="flex flex-col-reverse md:flex-row justify-between items-start bg-[#FAF6F3] md:bg-white border border-[#D9D9D9] md:border-transparent gap-6 pt-4 md:pt-20">
      <div>
        <h2 className="font-medium text-2xl md:text-[40px] pb-3 md:pb-6 max-w-[13em] text-center md:text-left">
          How to Submit Real-World Asset NFTs for Auction
        </h2>
        <p className="text-[12px] md:text-xl max-w-[30em] text-center md:text-left">
          List your real-world assets as NFTs in just a few simple steps—
          secure, transparent, and globally accessible.
        </p>
        <ul className="pt-6 md:pt-10 pb-6 md:pb-20">
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
                  <p className="text-xl mb-3 font-medium capitalize">
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
        className="md:basis-1/2 md:max-w-[53%]"
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
