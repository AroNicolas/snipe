import heroImage from "../../assets/hero.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative flex-1 flex items-center justify-center text-center px-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 text-white max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Snipe
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
          A smart darts scoring calculator to track your games, improve your precision,
          and focus on what really matters: hitting the bullseye.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/how-to-play"
            className="px-6 py-3 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            How to play
          </Link>

          <Link
            to="/start"
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition"
          >
            Start
          </Link>
        </div>
      </div>
    </section>
  );
}