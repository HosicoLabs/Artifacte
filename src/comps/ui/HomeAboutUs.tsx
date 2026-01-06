import Link from "next/link";
import SectionWrapper from "../primitive/SectionWrapper";

export default function HomeAboutUs() {
  return (
    <SectionWrapper className="md:bg-white md:px-10 md:py-30">
      <p className="uppercase font-inter text-[18px] font-medium opacity-60 mb-4">
        about us
      </p>
      <div className="flex items-end justify-between mb-10">
        <h2 className="tracking-[-2%] font-medium font-inter text-[40px] basis-1/2 leading-[120%] max-w-[19em]">
          Curating <span className="text-[#6C737F]">Real-World Assets</span> To
          Shape The Future Of Ownership Through
          <span className="text-[#6C737F]">Transparent</span> And{" "}
          <span className="text-[#6C737F]">Trusted Auctions.</span>
        </h2>
        <p className="text-[18px] basis-1/2 max-w-[35em]">
          We curate and auction real-world assets as NFTs, ensuring verified
          provenance, transparent auctions, and secure ownership worldwide.
        </p>
      </div>
      <div className="relative">
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white w-50 h-50 z-10 grid items-center justify-center rounded-full shadow-[inset_0_0_0_17px_#f4f4f4] text-[20px]">
          <Link href="#">About Us</Link>
        </div>
        <div className="flex gap-7">
          <img
            className="max-w-[calc(50vw-3.5rem)]"
            src="./img/home-about-1.png"
            alt=""
          />
          <img
            className="max-w-[calc(50vw-3.5rem)]"
            src="./img/home-about-2.png"
            alt=""
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
