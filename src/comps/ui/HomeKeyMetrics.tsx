"use client";
import { useEffect, useState } from "react";
import Button from "../primitive/Button";
import { twMerge } from "tailwind-merge";

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
    <section className="py-20 pr-10">
      <div className="pl-10 mb-10">
        <p className="uppercase font-inter font-medium text-[18px] opacity-60">
          key metrics
        </p>
        <h2 className="font-medium text-[40px] capitalize">
          platform at a glance
        </h2>
      </div>

      <div className="flex gap-10 ">
        <div
          className="relative bg-cover bg-no-repeat grow"
          style={{
            background: "url(/img/home-key-metrices.png)",
          }}
        >
          <div className=" p-10 flex flex-col justify-end h-full">
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
        <div className="flex flex-col divide-y divide-[#d9d9d9] basis-1/4">
          {DETAILS.map((item, i) => {
            return (
              <div key={i} className=" py-8">
                <p className="text-[64px] mb-3">{item.value}</p>
                <p className="mb-3 font-medium text-2xl">{item.title}</p>
                <p className="font-light text-xl">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
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
    <section className="flex justify-between px-10 py-20 items-start">
      <div className="max-w-[31%]">
        <h2 className="font-medium text-[40px] pb-6">
          How to Submit Real-World Asset NFTs for Auction
        </h2>
        <p className="text-xl">
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
                  <p className="text-xl text-[#6C737F]">{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <Button className="text-white bg-[#162737]">submit now</Button>
      </div>
      <img
        className="basis-1/2 max-w-1/2"
        src="./img/home-key-metrices-bot.png"
        alt=""
      />
    </section>
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
