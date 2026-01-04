import Link from "next/link";

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

export default function Footer() {
  const optClass = "px-3";
  return (
    <footer className="px-10 py-6">
      <div className="ml-auto w-1/2 max-w-150">
        <p className="text-3xl capitalize text-[#6C737F] mb-10 leading-[140%]">
          Artiface presents
          <span className="text-black underline mx-[.5em] capitalize">
            Curated objects, balancing historical context, considered exchange,
            and long-term
          </span>
          Relevance across markets.
        </p>
        <ul className="flex item-center gap-4">
          {SOCIAL_MEDIA.map((item, i) => {
            return (
              <Link key={i} href={item.href}>
                <img className="w-6" src={item.src} alt="" />
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex items-end justify-between">
        <Link href="#">
          <img className="h-20.5" src="./img/logo-footer.png" alt="artifacte" />
        </Link>

        <p>©Artifacte. All Rights Reserved.</p>

        <ul className="flex">
          <li className={`${optClass}`}>Terms & Conditions</li>
          <li className={`${optClass} border-x`}>Privacy Policy</li>
          <li className={`${optClass}`}>Risk Disclosure</li>
        </ul>
      </div>
    </footer>
  );
}
