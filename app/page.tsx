import HeroSection from "@/components/home/HeroSection";
import ProductHighlights from "@/components/home/ProductHighlights";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <ProductHighlights />
      <CallToAction />
    </main>
  );
}
