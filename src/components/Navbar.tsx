import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import MobileMenu from "./home/MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-emerald-700 text-white px-4 md:px-6 py-3 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-7 h-7" />
          <span className="text-lg md:text-xl font-bold">Snipe</span>
        </div>

        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/">Home</Link>
          <Link to="/how-to-play">How to play</Link>
          <Link to="/start">Start</Link>
        </div>

        <button
          className="md:hidden text-2xl z-50"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}