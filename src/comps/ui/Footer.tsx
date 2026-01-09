import Link from "next/link";
import SectionWrapper from "../primitive/SectionWrapper";

const SOCIAL_MEDIA = [
  {
    src: "./img/instagram.png",
    href: "#",
  },
  {
    src: "./img/facebook.png",
    href: "#",
  },
  {
    src: "./img/linkedin.png",
    href: "#",
  },
  {
    src: "./img/twitter.png",
    href: "#",
  },
  {
    src: "./img/youtube.png",
    href: "#",
  },
];

const NAVIGATION_LINKS = [
  { href: "#", label: "live auctions" },
  { href: "#", label: "collections" },
  { href: "#", label: "submit asset" },
  { href: "#", label: "how it works" },
  { href: "#", label: "about" },
  { href: "#", label: "support" },
];

export default function Footer() {
  const optClass = "px-3";
  return (
    <SectionWrapper className="mx-2 px-0 md:px-10 pb-6 md:pb-10 pt-4.5 md:pt-0 bg-[#FAF6F3] md:bg-white border border-[#D9D9D9] md:border-transparent">
      <ul className="hidden md:flex gap-5 items-center py-10">
        {NAVIGATION_LINKS.map((link, i) => (
          <Link key={i} className="capitalize" href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="md:border-y md:border-y-[#d9d9d9] md:py-10">
        <div className="md:ml-auto md:w-1/2 md:max-w-150 ">
          <p className="text-2xl md:text-3xl text-center md:text-left capitalize text-[#6C737F] mb-3 md:mb-10 leading-[140%] tracking-[-5%]">
            Artiface presents
            <span className="text-black underline mx-[.5em] capitalize">
              Curated objects, balancing historical context, considered
              exchange, and long-term
            </span>
            Relevance across markets.
          </p>
          <ul className="flex item-center justify-center md:justify-start gap-4">
            {SOCIAL_MEDIA.map((item, i) => {
              return (
                <Link key={i} href={item.href}>
                  <img className="w-6" src={item.src} alt="" />
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between mt-22.5 md:mt-0">
        <Link href="#">
          <img
            className="h-20.5 mb-7 md:mb-0"
            src="./img/logo-footer.png"
            alt="artifacte"
          />
        </Link>

        <p className="mb-5 md:mb-0">©Artifacte. All Rights Reserved.</p>

        <ul className="flex">
          <li className={`${optClass} border-r md:border-r-0`}>
            Terms & Conditions
          </li>
          <li className={`${optClass} md:border-x`}>Privacy Policy</li>
          <li className={`${optClass} hidden md:inline`}>Risk Disclosure</li>
        </ul>
      </div>
    </SectionWrapper>
  );
}
