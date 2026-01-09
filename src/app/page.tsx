import HomeAboutUs from "@/comps/ui/Home/HomeAboutUs";
import HomeCollection from "@/comps/ui/Home/HomeCollection";
import HomeHero from "@/comps/ui/Home/HomeHero";
import HomeKeyMetrices from "@/comps/ui/Home/HomeKeyMetrics";
import HomeValues from "@/comps/ui/Home/HomeValues";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeCollection />
      <HomeAboutUs />
      <HomeValues />
      <HomeKeyMetrices />
    </main>
  );
}
