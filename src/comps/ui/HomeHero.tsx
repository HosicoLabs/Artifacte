import Button from "../primitive/Button";

export default function HomeHero() {
  return (
    <section className="relative">
      <div className="absolute z-10 block h-62.5 pointer-events-none bg-linear-to-b from-[#00000040] to-[#00000000] "></div>
      <img className="brightness-80" src="./img/home-hero.webp" alt="" />
      <div className="absolute z-20 bottom-0 w-full px-10 py-16">
        <h1 className="font-philosopher text-[82px] text-white max-w-[9em]">
          Curating the Future of Asset Ownership
        </h1>
        <div className="flex items-center justify-between">
          <p className="font-geist leading-[160%] max-w-[45em] text-white">
            A curated auction platform where real-world assets are tokenized as
            NFTs and traded with full transparency, enabling secure ownership,
            verified provenance, and global market access.
          </p>
          <Button>explore auctions</Button>
        </div>
      </div>
    </section>
  );
}
