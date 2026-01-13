import { twMerge } from "tailwind-merge";
import Button from "../../primitive/Button";
import Picture from "../../primitive/Picture";
import SectionName from "../../primitive/SectionName";
import SectionWrapper from "../../primitive/SectionWrapper";

type CuratedItemType = {
  name: string;
  img: string;
  imgSm: string;
  currentBid: string | null;
  bidEnded: string | null;
  currentPrice: string | null;
};

type CuratedItemProps = CuratedItemType & {
  wrap?: boolean;
};

const CURATED_ASSETS: CuratedItemType[] = [
  {
    name: "oakwood cabinet (1960s)",
    currentBid: "2.6 ETH",
    bidEnded: "1d 12h",
    currentPrice: null,
    img: "./img/oakwood-cabinet.png",
    imgSm: "./img/oakwood-cabinet-sm.png",
  },
  {
    name: "hand crafted storage (1954)",
    currentBid: "2.6 ETH",
    bidEnded: "1d 12h",
    currentPrice: null,
    img: "./img/hand-crafted-storage.png",
    imgSm: "./img/hand-crafted-storage-sm.png",
  },
  {
    name: "pair of molina armless",
    currentBid: "2.6 ETH",
    bidEnded: "1d 12h",
    currentPrice: null,
    img: "./img/pair-of-molina-armless.png",
    imgSm: "./img/pair-of-molina-armless-sm.png",
  },
  {
    name: "edwin dining chair",
    currentBid: null,
    bidEnded: null,
    currentPrice: "2.6 ETH",
    img: "./img/edwin-dining-chair.png",
    imgSm: "./img/edwin-dining-chair-sm.png",
  },
  {
    name: "aria dining chair",
    currentBid: null,
    bidEnded: null,
    currentPrice: "2.6 ETH",
    img: "./img/aria-dining-chair.png",
    imgSm: "./img/aria-dining-chair-sm.png",
  },
  {
    name: "sydney armchair",
    currentBid: null,
    bidEnded: null,
    currentPrice: "2.6 ETH",
    img: "./img/sydney-armchair.png",
    imgSm: "./img/sydney-armchair-sm.png",
  },
  {
    name: "oxley coffe table",
    currentBid: null,
    bidEnded: null,
    currentPrice: "2.6 ETH",
    img: "./img/oxley-coffe-table.png",
    imgSm: "./img/oxley-coffe-table-sm.png",
  },
];

function CuratedItem({
  img,
  name,
  imgSm,
  currentBid,
  currentPrice,
  bidEnded,
  wrap = true,
}: CuratedItemProps) {
  const detailBaseClass =
    "flex  flex-col md:flex-row items-center justify-between mt-4 md:mt-5 gap-2 md:gap-2.5";
  const itemNameClass =
    "uppercase text-[16px] md:text-[20px] font-medium text-5";
  const itemPriceClass = "font-inter text-[#555] tracking-[-5%] leading-[150%]";
  const dividerClass = `relative after:absolute after:h-[1em] after:top-[50%] after:left-[50%] after:w-px after:z-10 after:translate-x-[50%] after:translate-y-[-50%]`;

  const detailClass = twMerge(
    detailBaseClass,
    wrap ? "md:gap-0 flex-wrap" : "md:gap-[5vw]"
  );
  return (
    <div>
      <Picture smSrc={imgSm} mdSrc={img} alt={name} />
      <div className={detailClass}>
        <p className={itemNameClass}>{name}</p>
        <div
          className={twMerge(
            "flex grow items-center",
            dividerClass,
            currentBid != null
              ? "justify-between "
              : "justify-center md:justify-start ",
            currentBid != null ? "after:bg-[#555]" : "after:bg-transparent",
            wrap ? " w-full" : "w-full md:w-fit"
          )}
        >
          {currentBid && (
            <p className={`${itemPriceClass}`}>
              Current Bid:{" "}
              <span className="font-bold">{currentBid || "-"}</span>
            </p>
          )}
          {bidEnded && (
            <p className={`${itemPriceClass}`}>
              Auction Ends: <span className="font-bold">{bidEnded || "-"}</span>{" "}
            </p>
          )}

          {currentPrice && (
            <p className={itemPriceClass}>
              Current Price :{" "}
              <span className="font-bold">{currentPrice || "-"}</span>{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomeCollection() {
  return (
    <SectionWrapper className="pt-0 pb-0 md:py-25 px-0 md:px-10 bg-white border border-[#D9D9D9] md:border-transparent ">
      <div className="bg-[#FAF6F3] md:bg-transparent  pt-10 md:pt-0 px-4 md:px-0">
        <SectionName className="text-center md:text-left">
          collection
        </SectionName>
        <h2 className="capitalize font-medium text-[28px] md:text-[48px] text-center md:text-left">
          Curated Real-World Assets
        </h2>
        <p className="max-w-[30em] text-[12px] md:text-[18px] text-center md:text-left">
          Explore a curated selection of real-world assets, tokenized as NFTs
          and presented through transparent, on-chain auctions.
        </p>
      </div>
      <div className="md:py-10 ">
        <div className="mb-2 bg-[#FAF6F3] md:bg-transparent px-4 md:px-0 py-6 md:py-0 flex flex-col md:grid md:grid-cols-4 md:grid-rows-5  gap-8 md:gap-5 md:mb-20 ">
          <div className="md:col-span-2 md:row-span-5">
            <CuratedItem wrap={false} {...CURATED_ASSETS[0]} />
          </div>

          <div className="md:row-span-3 md:col-start-3 md:row-start-1">
            <CuratedItem {...CURATED_ASSETS[1]} />
          </div>
          <div className="md:row-span-3 md:col-start-4 md:row-start-1">
            <CuratedItem {...CURATED_ASSETS[2]} />
          </div>
          <p className="text-[12px] md:text-[18px] text-center md:text-left text-[#363636] col-span-2  md:col-start-3 row-start-13 md:row-start-4  md:mt-auto">
            Each asset is supported by verified documentation, detailed
            provenance records, and transparent on-chain ownership—ensuring
            authenticity, trust, and confidence throughout the auction process.
          </p>
        </div>
        <div className="px-4 md:px-0 pb-6 md:pb-0 pt-4 md:pt-0 bg-[#FAF6F3] md:bg-transparent flex gap-6 md:gap-5 flex-col md:flex-row">
          {CURATED_ASSETS.slice(-4).map((asset, i) => (
            <CuratedItem key={i} {...asset} />
          ))}
        </div>
      </div>
      <div className="flex pb-6 md:pb-0 px-4 md:px-0 items-center justify-between bg-[#FAF6F3] md:bg-transparent ">
        <div className="flex  gap-4 items-center">
          <Button className="border bg-transparent p-3 border-[#00000010]">
            <img className="w-5" src="./img/chevron-left.png" />
          </Button>
          <Button className="border bg-transparent p-3 border-[#00000010]">
            <img className="w-5" src="./img/chevron-right.png" />
          </Button>
        </div>
        <Button className="bg-[#00000005] text-black">view all</Button>
      </div>
    </SectionWrapper>
  );
}
