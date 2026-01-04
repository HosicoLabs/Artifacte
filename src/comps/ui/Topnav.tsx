import Link from "next/link";
import Button from "../primitive/Button";

const URLS = [
  {
    href: "#",
    label: "live auctions",
  },
  {
    href: "#",
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
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-10 py-3">
      <div>
        <Link href="#">
          <img className="h-6" src="./img/logo-light.png" alt="artifacte" />
        </Link>
      </div>
      <ul className="flex items-center gap-8">
        {URLS.map((link, i) => {
          return (
            <Link
              className="font-geist capitalize text-white"
              key={i}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
      <div className="flex items-center gap-4">
        <button className="cursor-pointer bg-transparent outline-transparent border-transparent">
          <img className="w-5" src="./img/search-light.png" alt="search" />
        </button>
        <Button>connect</Button>
      </div>
    </nav>
  );
}
