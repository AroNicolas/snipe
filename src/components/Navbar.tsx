import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import MobileMenu from "./home/MobileMenu";
import { useConfigStore } from "../store/configStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const openModal = useConfigStore((s) => s.openModal);

  return (
    <>
      <nav className="bg-emerald-700 text-white px-4 md:px-6 py-3 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-7 h-7" />
          <span className="text-lg md:text-xl font-bold">Snipe</span>
        </div>

        <div className="hidden md:flex gap-8 font-medium items-center">
          <Link to="/">Home</Link>
          <Link to="/how-to-play">How to play</Link>
          <button
            onClick={openModal}
            className="px-4 py-1.5 bg-white text-emerald-800 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Start
          </button>
        </div>

        <button
          className="md:hidden text-2xl z-50"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} onStart={openModal} />
    </>
  );
}
