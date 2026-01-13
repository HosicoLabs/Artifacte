"use client";
import Link from "next/link";
import Button from "../primitive/Button";
import Picture from "../primitive/Picture";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const URLS = [
  {
    href: "#",
    label: "live auctions",
  },
  {
    href: "/collections",
    label: "collections",
  },
  {
    href: "#",
    label: "how it works",
  },
  {
    href: "#",
    label: "submit asset",
  },
  {
    href: "#",
    label: "about",
  },
];

export default function Topnav() {
  const path = usePathname();
  const [opened, setOpened] = useState<boolean>(false);

  const containerBaseClass =
    "flex items-center justify-between bg-white md:bg-transparent py-3 px-5 md:px-10 md:py-3 fixed top-0 w-full z-50 border-b border-b-[#d9d9d9] backdrop-blur-[20px]";

  const isHomePage = path == "/";
  return (
    <nav
      className={twMerge(
        containerBaseClass,
        isHomePage ? "bg-[#11111110]" : "bg-[#ffffff10]"
      )}
    >
      {/* left  */}
      <div className="flex items-center justify-between grow md:grow-0">
        <div className="flex items-center gap-3">
          <Button
            className="p-0 md:hidden"
            onClick={() => setOpened((prev) => !prev)}
          >
            <img className="w-5" src="./img/menu.png" alt="" />
          </Button>
          <Link href="/" onClick={() => setOpened(() => false)}>
            <Picture
              mdSrc={
                isHomePage ? "./img/logo-light.png" : "./img/logo-dark.png"
              }
              smSrc="./img/logo-dark.png"
              alt="artifacte"
              className="h-6"
            />
          </Link>
        </div>
        <Button className="md:hidden border border-2-solid">connect</Button>
      </div>
      {/* desktop */}
      <ul className="hidden md:flex items-center gap-8">
        {URLS.map((link, i) => {
          return (
            <Link
              className={twMerge(
                "font-geist capitalize",
                isHomePage ? "text-white" : "text-[#111]",
                !isHomePage && path == link.href
                  ? "font-semibold"
                  : "font-normal"
              )}
              key={i}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
      <div className="hidden md:flex items-center gap-4">
        <Button className="bg-transparent p-0">
          <img className="w-5" src="./img/search-light.png" alt="search" />
        </Button>
        <Button className={isHomePage ? "" : "bg-[#111] text-white"}>
          connect
        </Button>
      </div>
      {/* mobile */}
      <div
        className={`flex flex-col md:hidden absolute top-full left-0 w-full  bg-white px-5  overflow-hidden transition-[height] ${
          opened ? "h-[90vh]" : "h-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {URLS.map((link, i) => {
            return (
              <Link
                onClick={() => setOpened(() => false)}
                className="font-geist capitalize "
                key={i}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </ul>
        <div className="hidden gap-4">
          <Button className="bg-transparent p-0">
            <img className="w-5" src="./img/search-light.png" alt="search" />
          </Button>
          <Button>connect</Button>
        </div>
      </div>
    </nav>
  );
}
