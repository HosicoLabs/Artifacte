import HomeAboutUs from "@/comps/ui/HomeAboutUs";
import HomeCollection from "@/comps/ui/HomeCollection";
import HomeHero from "@/comps/ui/HomeHero";
import HomeValues from "@/comps/ui/HomeValues";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeCollection />
      <HomeAboutUs />
      <HomeValues />
    </main>
  );
}
