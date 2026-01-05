import HomeAboutUs from "@/comps/ui/HomeAboutUs";
import HomeCollection from "@/comps/ui/HomeCollection";
import HomeHero from "@/comps/ui/HomeHero";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeCollection />
      <HomeAboutUs />
    </main>
  );
}
