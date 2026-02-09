import Button from "../../primitive/Button";
import Picture from "../../primitive/Picture";
import SectionWrapper from "../../primitive/SectionWrapper";

export default function HomeValues() {
  return (
    <SectionWrapper className="px-0 py-0 mx-0 mt-0 mb-5 md:pr-0 grid md:gap-x-10 grid-cols-1 md:grid-cols-3 grid-rows-10 md:grid-rows-4">
      <p className="hidden md:inline text-[20px] md:col-start-1 md:row-start-2">
        values
      </p>
      <p className="px-2 md:px-0 text-[#6C737F] text-[20px] md:mt-75 row-span-3 md:row-span-2 md:col-start-1 row-start-8 md:row-start-3">
        We focus on trust and transparency in how every real-world asset is
        presented and auctioned.
        <span className="text-black underline mt-[1em] block">
          And we prioritize secure ownership and fair auctions to maintain trust
          across every asset.
        </span>
      </p>
      <h2 className="px-2 md:px-0 font-medium text-[20px] md:text-[40px] leading-[120%] max-w-[20em] row-span-2 md:row-span-1 row-start-6 md:row-start-1 md:col-span-2 md:col-start-2 ">
        <span className="text-[#6C737F]">Commitment to </span>Trust,
        Transparency, Provenance, And Secure Ownership In Every Auction.
      </h2>
      <div className="md:col-span-2 row-span-5 md:row-span-3 md:col-start-2 md:row-start-2">
        <Picture
          smSrc="/img/home-values-sm.png"
          mdSrc="/img/home-values.png"
        />
      </div>
    </SectionWrapper>
  );
}
