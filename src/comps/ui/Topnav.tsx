"use client";
import Link from "next/link";
import Button from "../primitive/Button";
import Picture from "../primitive/Picture";
import StyledWalletButton from "./StyledWalletButton";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  {
    href: "/auctions",
    label: "live auctions",
  },
  {
    href: "/collections",
    label: "collections",
  },
  {
    href: "/my-collection",
    label: "my collection",
  },
  {
    href: "/overview",
    label: "overview",
  },
  {
    href: "#",
    label: "how it works",
  },
  {
    href: "#",
    label: "about",
  },
];

const CONTAINER_BASE_CLASS =
  "flex items-center justify-between py-3 px-5 md:px-10 md:py-3 fixed top-0 w-full z-50 border-b md:backdrop-blur-[20px]";

export default function Topnav() {
  const path = usePathname();
  const [opened, setOpened] = useState<boolean>(false);

  const isHomePage = path === "/";
  
  return (
    <nav
      className={cn(
        CONTAINER_BASE_CLASS,
        isHomePage ? "bg-[#191919] border-b-[#191919] md:bg-[#191919cc]" : "bg-white md:bg-[#ffffff10] border-b-[#d9d9d9]"
      )}
    >
      {/* left  */}
      <div className="flex items-center justify-between grow md:grow-0">
        <div className="flex items-center gap-3">
          <Button
            className="p-0 md:hidden bg-transparent"
            onClick={() => setOpened((prev) => !prev)}
          >
            <img className="w-5" src="/img/menu.png" alt="" />
          </Button>
          <Link href="/" onClick={() => setOpened(() => false)}>
            <Picture
              mdSrc={
                isHomePage ? "/img/logo-light.png" : "/img/logo-dark.png"
              }
              smSrc={isHomePage ? "/img/logo-light.png" : "/img/logo-dark.png"}
              alt="artifacte"
              className="h-6"
            />
          </Link>
        </div>
        <StyledWalletButton variant={isHomePage ? "light" : "light"} isMobile />
      </div>
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link, index) => {
          const isActive = !isHomePage && path === link.href;
          
          return (
            <Link
              className={cn(
                "font-geist capitalize",
                isHomePage ? "text-white" : "text-[#111]",
                isActive ? "font-semibold" : "font-normal"
              )}
              key={index}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
      <div className="hidden md:flex items-center gap-4">
        <Button className="bg-transparent p-0">
          <img className="w-5" src={isHomePage ? "/img/search-light.png" : "/img/search-dark.png"} alt="search" />
        </Button>
        <StyledWalletButton variant={isHomePage ? "light" : "dark"} />
      </div>
      {/* mobile */}
      <div
        className={cn(
          "flex flex-col md:hidden absolute top-full left-0 w-full bg-white px-5 overflow-hidden transition-[height]",
          opened ? "h-[90vh]" : "h-0"
        )}
      >
        <ul className="flex flex-col gap-4">
          {NAV_LINKS.map((link, index) => (
            <Link
              onClick={() => setOpened(false)}
              className="font-geist capitalize"
              key={index}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="hidden gap-4">
          <Button className="bg-transparent p-0">
            <img className="w-5" src="/img/search-light.png" alt="search" />
          </Button>
          <StyledWalletButton variant="light" />
        </div>
      </div>
    </nav>
  );
}
