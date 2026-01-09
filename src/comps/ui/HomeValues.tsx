import Button from "../primitive/Button";
import SectionWrapper from "../primitive/SectionWrapper";

export default function HomeValues() {
  return (
    <SectionWrapper className="hidden md:flex gap-10 items-end justify-between md:pr-0">
      <div>
        <p className="text-[20px]">values</p>
        <p className="text-[#6C737F] text-[20px] mt-75">
          We focus on trust and transparency in how every real-world asset is
          presented and auctioned.
          <span className="text-black underline mt-[1em] block">
            And we prioritize secure ownership and fair auctions to maintain
            trust across every asset.
          </span>
        </p>

        <div className="flex items-center justify-between mt-15">
          <p className="text-[20px]">Platform Values</p>
          <div className="flex items-center">
            <Button className="bg-transparent p-4">
              <img className="w-5" src="./img/chevron-left.png" alt="" />
            </Button>
            <span className="text-[20px] capitalize text-[#6C737F]">
              mission
            </span>
            <Button className="bg-transparent p-4">
              <img className="w-5" src="./img/chevron-right.png" alt="" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-medium text-[40px] leading-[120%] max-w-[20em] mb-10">
          <span className="text-[#6C737F]">Commitment to </span>Trust,
          Transparency, Provenance, And Secure OwnershipIn Every Auction.
        </h2>
        <img src="./img/home-values.png" />
      </div>
    </SectionWrapper>
  );
}
