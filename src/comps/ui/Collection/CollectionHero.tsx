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
  return (
    <SectionWrapper className="md:px-0 md:py:0 md:py-0">
      <div className="md:px-10 md:pt-20 md:pb-5">
        <div className="flex justify-between items-center md:mb-10">
          <h1 className="capitalize font-medium md:text-5xl leading-[100%] tracking-[-2%] md:max-w-[10em]">
            curated <br />
            on-chain NFT collection
          </h1>
          <p className="md:text-lg text-[#6C737F] leading-[150%] md:max-w-[38em]">
            Explore a curated collection of NFTs, selected for their conceptual
            depth, visual integrity, and cultural relevance. Each piece is
            presented as a unique on-chain asset, released through transparent
            auctions and designed for long-term digital ownership.
          </p>
        </div>
      </div>
      <ul className="md:px-10 md:py-6 flex items-center justify-between border-t border-t-[#ddd]">
        {ACHIEVEMENT_LIST.map((achv, i) => {
          return (
            <li key={i} className="flex flex-col gap-3">
              <p className="md:text-5xl font-medium">
                {achv.count}+
                <span className="font-normal text-[18px] ml-[.5em]">NFTs</span>
              </p>
              <p className="text-lg text-[#6C737F] ">{achv.desc}</p>
            </li>
          );
        })}
      </ul>
      <img
        src="./img/collection_hero.webp"
        className="max-w-full"
        alt="artifacte"
      />
    </SectionWrapper>
  );
}
