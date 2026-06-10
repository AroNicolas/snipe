import howToPlayImage from "../assets/howtoplay.jpg";
import Footer from "../components/Footer";
import GameVariant from "../components/howToPlay/GameVariant";
import IntroSection from "../components/howToPlay/IntroSection";
import Navbar from "../components/Navbar";

export default function HowToPlay() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${howToPlayImage})` }}
      />

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-1 px-4 md:px-10 py-8 md:py-12 max-w-6xl mx-auto w-full">
          <IntroSection />
          <GameVariant />
        </main>

        <Footer />

      </div>
    </div>
  );
}