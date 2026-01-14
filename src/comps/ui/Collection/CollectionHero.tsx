import Picture from "@/comps/primitive/Picture";
import SectionWrapper from "@/comps/primitive/SectionWrapper";

type Achievement = {
  count: number;
  desc: string;
};

const ACHIEVEMENT_LIST: Achievement[] = [
  {
    count: 25,
    desc: "Digital Art & Editions",
  },
  {
    count: 10,
    desc: "1/1 Conceptual Works",
  },
  {
    count: 15,
    desc: "Generative & Algorithmic",
  },
  {
    count: 18,
    desc: "Experimental Media",
  },
  {
    count: 12,
    desc: "Design-led NFTs",
  },
];

export default function CollectionHero() {
  const achievements = (
    <ul className="mt-auto md:mt-0 px-7 md:px-10 md:py-6 flex items-center justify-between md:border-t md:border-t-[#ddd] relative z-1 animate-[slide_20s_linear_infinite] md:animate-none">
      {ACHIEVEMENT_LIST.map((achv, i) => {
        return (
          <li
            key={i}
            className="flex flex-col gap-3 text-white md:text-black min-w-[50vw] md:min-w-[unset]"
          >
            <p className="text-3xl md:text-5xl font-medium">
              {achv.count}+
              <span className="font-normal text-[18px] ml-[.5em]">NFTs</span>
            </p>
            <p className="text-lg md:text-[#6C737F] text-[13px] md:text-[16px] text-nowwrap md:text-wrap">
              {achv.desc}
            </p>
          </li>
        );
      })}
    </ul>
  );
  return (
    <SectionWrapper className="md:min-h-auto px-2.5 md:px-0 pt-17 md:pt-18 pb-10 md:pb-0 relative bg-transparent overflow-hidden flex flex-col justify-between md:block after:block md:after:hidden after:h-[30%] after:w-full after:absolute after:bottom-0 after:left-0 after:pointer-events-none after:bg-linear-to-t after:from-[#00000060] after:to-[#00000000]">
      <div className="md:px-10 md:pt-20 md:pb-5 mb-110 md:mb-0">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-0 md:mb-10">
          <h1 className="capitalize font-medium text-4xl md:text-5xl leading-[100%] tracking-[-2%] max-w-[10em] text-center md:text-left">
            curated <br className="hidden md:inline" />
            on-chain NFT collection
          </h1>
          <p className="text-[14px] md:text-lg text-center md:text-left text-[#6C737F] leading-[150%] md:max-w-[38em]">
            Explore a curated collection of NFTs, selected for their conceptual
            depth, visual integrity, and cultural relevance. Each piece is
            presented as a unique on-chain asset, released through transparent
            auctions and designed for long-term digital ownership.
          </p>
        </div>
      </div>
      <div className="hidden md:block">{achievements}</div>
      <div className="flex md:hidden gap-0">
        {achievements}
        {achievements}
      </div>
      <Picture
        mdSrc="./img/collection_hero.webp"
        smSrc="./img/collection_hero_sm.webp"
        className="max-w-full absolute md:static top-0 left-0 z-[-1] "
        alt="artifacte"
      />
    </SectionWrapper>
  );
}
