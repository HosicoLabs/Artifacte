import CollectionAbout from "@/comps/ui/Collection/CollectionAbout";
import CollectionAssets from "@/comps/ui/Collection/CollectionAssets";
import CollectionHero from "@/comps/ui/Collection/CollectionHero";

export default function Page() {
  return (
    <main>
      <CollectionHero />
      <CollectionAssets />
      <CollectionAbout />
    </main>
  );
}
