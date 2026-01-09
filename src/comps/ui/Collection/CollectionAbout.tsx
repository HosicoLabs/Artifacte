import SectionWrapper from "@/comps/primitive/SectionWrapper";

type Feature = {
  img: string;
  title: string;
  desc: string;
};

const FEATURES_LIST: Feature[] = [
  {
    img: "./img/armchair.png",
    title: "curated selection",
    desc: "Each NFT is thoughtfully curated for its conceptual depth, visual integrity, and relevance as a long-term digital collectible.",
  },
  {
    img: "./img/clock.png",
    title: "curated selection",
    desc: "Every NFT is supported by verifiable on-chain metadata and contextual records, ensuring authenticity, traceability, and collector trust.",
  },
  {
    img: "./img/truck.png",
    title: "curated selection",
    desc: "NFTs are presented through structured listings, with clear context, consistent formatting, and secure on-chain ownership.",
  },
  {
    img: "./img/globe.png",
    title: "curated selection",
    desc: "The platform is accessible to a global network of collectors and communities, enabling discovery and ownership without borders.",
  },
];

export default function CollectionAbout() {
  return (
    <SectionWrapper className="md:py-10">
      <h1 className="font-medium capitalize md:text-[40px] md:text-center md:mb-3">
        about the platform
      </h1>
      <p className="md:mx-auto text-[#6C737F] md:text-lg md:max-w-[40em] md:text-center md:mb-10">
        Built as a curated NFT platform for exceptional digital assets,
        combining verifiable metadata, thoughtful curation, and long-term
        ownership.
      </p>
      <ul className="flex md:gap-5 justify-between">
        {FEATURES_LIST.map((feat, i) => {
          return (
            <li key={i} className="flex flex-col p-4  bg-[#ffffff40]">
              <img src={feat.img} className="w-8" alt="" />
              <p className="mt-10 mb-3 md:text-xl font-medium">{feat.title}</p>
              <p className="text-[#6C737F]">{feat.desc}</p>
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
}
