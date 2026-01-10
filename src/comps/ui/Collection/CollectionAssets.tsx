import Button from "@/comps/primitive/Button";
import SectionWrapper from "@/comps/primitive/SectionWrapper";

export default function CollectionAssets() {
  return (
    <SectionWrapper className="md:px-10 md:py-10">
      <form className="bg-white rounded-xl overflow-hidden flex items-center justify-between px-3.5 relative">
        <input
          className="placeholder:text-black placeholder:capitalize py-4.5 grow"
          type="text"
          placeholder="search assets"
        />
        <Button
          className="p-0 absolute right-3.5 top-[50%] translate-y-[-50%]"
          type="submit"
        >
          <img className="w-4.5" src="./img/search-dark.png" alt="" />
        </Button>
      </form>
    </SectionWrapper>
  );
}
