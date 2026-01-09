import Button from "../primitive/Button";
import Picture from "../primitive/Picture";
import SectionWrapper from "../primitive/SectionWrapper";

export default function HomeHero() {
  return (
    <SectionWrapper className="relative md:px-0  px-0 pt-0 md:pt-0 pb-0 md:pb-0">
      <div className="absolute z-10 block h-62.5 pointer-events-none bg-linear-to-b from-[#00000040] to-[#00000000] "></div>
      <Picture
        mdSrc="./img/home-hero.webp"
        smSrc="./img/home-hero-sm.png"
        className="brightness-80"
      />
      <div className="absolute z-20 bottom-0 w-full px-2.5 md:px-10 py-6 md:py-16">
        <h1 className="font-philosopher text-[40px] md:text-[82px] mb-4 md:mb-6 text-white mx-auto md:mx-0 max-w-[9em] md:max-w-[9em] text-center md:text-left tracking-[-5%] leading-[100%]">
          Curating the Future of Asset Ownership
        </h1>
        <div className="flex flex-col gap-6 md:flex-row items-center justify-between">
          <p className="font-geist leading-[160%] max-w-[45em] text-white text-center md:text-left">
            A curated auction platform where real-world assets are tokenized as
            NFTs and traded with full transparency, enabling secure ownership,
            verified provenance, and global market access.
          </p>
          <Button>explore auctions</Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
