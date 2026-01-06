import Button from "../primitive/Button";
import SectionName from "../primitive/SectionName";
import SectionWrapper from "../primitive/SectionWrapper";

type CuratedItemType = {
  name: string;
  img: string;
  currentBid: string | null;
  bidEnded: string | null;
  currentPrice: string | null;
};

const CURATED_ASSETS: CuratedItemType[] = [
  {
    name: "oakwood cabinet (1960s)",
    currentBid: "2.6 ETH",
    bidEnded: "1d 12h",
    currentPrice: null,
    img: "./img/oakwood-cabinet.png",
  },
  {
    name: "hand crafted storage (1954)",
    currentBid: "2.6 ETH",
    bidEnded: "1d 12h",
    currentPrice: null,
    img: "./img/hand-crafted-storage.png",
  },
  {
    name: "pair of molina armless",
    currentBid: "2.6 ETH",
    bidEnded: "1d 12h",
    currentPrice: null,
    img: "./img/pair-of-molina-armless.png",
  },
  {
    name: "edwin dining chair",
    currentBid: null,
    bidEnded: null,
    currentPrice: "2.6 ETH",
    img: "./img/edwin-dining-chair.png",
  },
  {
    name: "aria dining chair",
    currentBid: null,
    bidEnded: null,
    currentPrice: "2.6 ETH",
    img: "./img/aria-dining-chair.png",
  },
  {
    name: "sydney armchair",
    currentBid: null,
    bidEnded: null,
    currentPrice: "2.6 ETH",
    img: "./img/sydney-armchair.png",
  },
  {
    name: "oxley coffe table",
    currentBid: null,
    bidEnded: null,
    currentPrice: "2.6 ETH",
    img: "./img/oxley-coffe-table.png",
  },
];

function CuratedItem(props: CuratedItemType) {
  const itemNameClass = "uppercase text-[20px] font-medium text-5";
  const itemPriceClass = "font-inter";
  return (
    <div>
      <img src={props.img} alt={props.name} />
      <div className="flex flex-wrap items-center justify-between mt-5 gap-2.5">
        <p className={itemNameClass}>{props.name}</p>
        <div className="flex">
          {props.currentBid && (
            <p className={`${itemPriceClass} px-[7.5px]`}>
              Current Bid :{" "}
              <span className="font-bold">{props.currentBid || "-"}</span>
            </p>
          )}
          {props.bidEnded && (
            <p className={`${itemPriceClass} px-[7.5px] border-l`}>
              Auction Ends :{" "}
              <span className="font-bold">{props.bidEnded || "-"}</span>{" "}
            </p>
          )}

          {props.currentPrice && (
            <p className={itemPriceClass}>
              Current Price :{" "}
              <span className="font-bold">{props.currentPrice || "-"}</span>{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomeCollection() {
  return (
    <SectionWrapper className="md:py-25 md:px-10">
      <div>
        <SectionName>collection</SectionName>
        <h2 className="capitalize font-medium text-[48px] ">
          Curated Real-World Assets
        </h2>
        <p className="max-w-[30em] text-[18px]">
          Explore a curated selection of real-world assets, tokenized as NFTs
          and presented through transparent, on-chain auctions.
        </p>
      </div>
      <div className="py-10">
        <div className="flex gap-5 mb-20">
          <div className="basis-1/2">
            <CuratedItem {...CURATED_ASSETS[0]} />
          </div>
          <div className="basis-1/2 flex flex-col justify-between pb-[2.5em]">
            <div className="flex gap-5">
              <CuratedItem {...CURATED_ASSETS[1]} />
              <CuratedItem {...CURATED_ASSETS[2]} />
            </div>
            <p className="text-[18px] text-[#363636]">
              Each asset is supported by verified documentation, detailed
              provenance records, and transparent on-chain ownership—ensuring
              authenticity, trust, and confidence throughout the auction
              process.
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          {CURATED_ASSETS.slice(-4).map((asset, i) => (
            <CuratedItem key={i} {...asset} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
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
