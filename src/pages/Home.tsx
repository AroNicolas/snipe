import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <footer className="bg-emerald-900 text-white text-center py-2">
        <p className="text-sm">
          © {new Date().getFullYear()} Snipe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}