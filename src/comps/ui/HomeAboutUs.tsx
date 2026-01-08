import Link from "next/link";
import SectionWrapper from "../primitive/SectionWrapper";
import Picture from "../primitive/Picture";
import SectionName from "../primitive/SectionName";

export default function HomeAboutUs() {
  return (
    <SectionWrapper className="bg-[#FAF6F3] md:bg-white md:px-10 md:py-30 border border-[#D9D9D9] md:border-transparent">
      <SectionName className="mb-4 text-center md:text-left ">
        about us
      </SectionName>
      <div className="flex flex-col md:flex-row items-end justify-between mb-3 md:mb-10 gap-3">
        <h2 className="font-medium font-inter text-2xl md:text-[40px] leading-[120%] max-w-[19em] tracking-[-5%] text-center md:text-left">
          Curating <span className="text-[#6C737F]">Real-World Assets</span> To
          Shape The Future Of Ownership Through
          <span className="text-[#6C737F]"> Transparent</span> And
          <span className="text-[#6C737F]"> Trusted Auctions.</span>
        </h2>
        <p className="text-[13px] md:text-[18px] basis-1/2 md:max-w-[45em] text-center md:text-left">
          We curate and auction real-world assets as NFTs, ensuring verified
          provenance, transparent auctions, and secure ownership worldwide.
        </p>
      </div>
      <div className="relative">
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white w-33.25 md:w-50 h-33.25 md:h-50 z-10 grid items-center justify-center rounded-full shadow-[inset_0_0_0_12px_#f4f4f4] md:shadow-[inset_0_0_0_17px_#f4f4f4] text-[13px] md:text-[20px]">
          <Link href="#">About Us</Link>
        </div>
        <div className="flex gap-3 md:gap-7">
          <Picture
            smSrc="./img/home-about-1-sm.png"
            mdSrc="./img/home-about-1.png"
            className=" md:max-w-[calc(50vw-3.5rem)]"
          />
          <Picture
            smSrc="./img/home-about-2-sm.png"
            mdSrc="./img/home-about-2.png"
            className=" md:max-w-[calc(50vw-3.5rem)]"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
