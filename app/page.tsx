import { HeroLucas } from "@/components/hero-lucas";
import { Mindset } from "@/components/mindset";
import { Products } from "@/components/products";
import { Testimonials } from "@/components/testimonials";
import { Story } from "@/components/story";
import { FooterLucas } from "@/components/footer-lucas";
import { AtmosphericShell } from "@/components/atmospheric-shell";

export default function Home() {
  return (
    <main className="relative">
      <div className="noise-overlay" />

      {/* Hero + Mindset — shared dark canvas */}
      <AtmosphericShell>
        <HeroLucas />
        <Mindset />
      </AtmosphericShell>

      {/* Products — LIGHT */}
      <Products />



      {/* Story — mixed (dark + light); dark parts use their own shell internally */}
      <Story />

      
     <Testimonials />
      

      {/* Footer — dark canvas */}
      <AtmosphericShell>
        <FooterLucas />
      </AtmosphericShell>
    </main>
  );
}
